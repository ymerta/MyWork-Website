import React, { useState, useEffect } from "react";
import { getDocs, collection, updateDoc, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import "../styles/MyTasksStyle.css";

interface Task {
  key: string;
  summary: string;
  status: string;
  comment: string;
  assignee: string;
  projectName: string;
  completedAt?: Date;
}

interface User {
  name: string;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data() as User;
          setUserName(userData.name);
        }
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    };

    const fetchTasks = async () => {
      try {
        if (!userName) return;

        const projectsSnapshot = await getDocs(collection(db, "projects"));
        const userTasks: Task[] = [];
        projectsSnapshot.forEach((projectDoc) => {
          const projectData = projectDoc.data() as { tasks: Task[]; name: string };
          const projectTasks = projectData.tasks || [];

          projectTasks.forEach((task) => {
            if (task.assignee === userName) {
              userTasks.push({
                ...task,
                projectName: projectData.name,
              });
            }
          });
        });

        setTasks(userTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchUserName();
    fetchTasks();
  }, [userName]);

  const handleStatusChange = (index: number) => {
    const newTasks = [...tasks];
    const currentStatus = newTasks[index].status;
    const nextStatus =
      currentStatus === "TO DO"
        ? "IN PROGRESS"
        : currentStatus === "IN PROGRESS"
        ? "DONE"
        : "TO DO";

    newTasks[index].status = nextStatus;

    if (nextStatus === "DONE" || nextStatus === "IN PROGRESS" ) {
      newTasks[index].completedAt = new Date();
    } else {
      newTasks[index].completedAt = undefined;
    }
    

    setTasks(newTasks);
  };

  const handleCommentChange = (index: number, newComment: string) => {
    const newTasks = [...tasks];
    newTasks[index].comment = newComment;
    setTasks(newTasks);
  };

  const updateTaskInFirestore = async (index: number) => {
    try {
      const task = tasks[index];
      const projectRef = await findProjectRefForTask(task.key, task.projectName);
      if (!projectRef) {
        console.error("Project reference not found");
        alert("Project reference not found");
        return;
      }

      const projectDoc = await getDoc(projectRef);
      if (projectDoc.exists()) {
        const projectData = projectDoc.data();
        
        if (!projectData.tasks) {
          console.error("Tasks not found in project data");
          alert("Tasks not found in project data");
          return;
        }
        
        const updatedTasks = projectData.tasks.map((t: Task) =>
          t.key === task.key
            ? { ...t, status: task.status, comment: task.comment, completedAt: task.completedAt }
            : t
        );

        await updateDoc(projectRef, {
          tasks: updatedTasks,
        });

        // Update local state with the updated task list
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t.key === task.key ? { ...t, status: task.status, comment: task.comment, completedAt: task.completedAt } : t
          )
        );

        alert("Task updated successfully");
      } else {
        console.error("Project document does not exist");
        alert("Project document does not exist");
      }
    } catch (error) {
      console.error("Error updating task in Firestore:", error);
      alert("Failed to update task");
    }
  };

  const findProjectRefForTask = async (taskKey: string, projectName: string) => {
    try {
      const projectsSnapshot = await getDocs(collection(db, "projects"));
      for (const projectDoc of projectsSnapshot.docs) {
        const projectData = projectDoc.data();
        if (projectData.name === projectName && projectData.tasks) {
          const task = projectData.tasks.find((t: Task) => t.key === taskKey);
          if (task) {
            return doc(db, "projects", projectDoc.id);
          }
        }
      }
    } catch (error) {
      console.error("Error finding project reference for task:", error);
    }
    return null;
  };

  return (
    <div className="task-card-container">
      <div className="task-card">
        <div className="task-table-container">
          <table className="task-table">
            <thead>
              <tr>
                <th>PROJECT</th>
                <th>KEY</th>
                <th>SUMMARY</th>
                <th>STATUS</th>
                <th>COMMENT</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td className="project-name">{task.projectName}</td>
                  <td className="task-key">{task.key}</td>
                  <td className="task-summary">{task.summary}</td>
                  <td
                    className={`task-status ${task.status.toLowerCase().replace(" ", "-")}`}
                    onClick={() => handleStatusChange(index)}
                  >
                    {task.status}
                  </td>
                  <td className="task-comment">
                    <input
                      type="text"
                      value={task.comment}
                      onChange={(e) => handleCommentChange(index, e.target.value)}
                    />
                  </td>
                  <td className="task-action">
                    <button onClick={() => updateTaskInFirestore(index)}>Save Changes</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tasks;