import React, { useState, useEffect } from 'react';
import { getDocs, collection, doc, getDoc, Timestamp } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import '../styles/MyTasksStyle.css';

interface Task {
  key: string;
  summary: string;
  status: string;
  comment: string;
  assignee: string;
  projectName: string;
  completedAt?: Timestamp; 
}

interface User {
  name: string;
}

const DoneTaskPage: React.FC = () => {
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);
  const [userName, setUserName] = useState<string>('');
  const [userProjects, setUserProjects] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data() as User;
          setUserName(userData.name);

          const projectsSnapshot = await getDocs(collection(db, 'projects'));
          const involvedProjects: Set<string> = new Set();

          projectsSnapshot.forEach((projectDoc) => {
            const projectData = projectDoc.data() as { tasks: Task[]; name: string };
            const projectTasks = projectData.tasks || [];

            if (
              projectTasks.some(
                (task) => task.assignee === userData.name
              )
            ) {
              involvedProjects.add(projectData.name);
            }
          });

          setUserProjects(involvedProjects);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchDoneTasks = async () => {
      try {
        const projectsSnapshot = await getDocs(collection(db, 'projects'));
        const tasks: Task[] = [];

        projectsSnapshot.forEach((projectDoc) => {
          const projectData = projectDoc.data() as { tasks: Task[]; name: string };
          const projectTasks = projectData.tasks || [];

          projectTasks.forEach((task) => {
            if (
              task.status === 'DONE' &&
              (task.assignee === userName || userProjects.has(projectData.name))
            ) {
              tasks.push({
                ...task,
                projectName: projectData.name,
              });
            }
          });
        });

        setDoneTasks(tasks);
      } catch (error) {
        console.error('Error fetching done tasks:', error);
      }
    };

    if (userName && userProjects.size > 0) {
      fetchDoneTasks();
    }
  }, [userName, userProjects]);

  const formatTimestamp = (timestamp: Timestamp | undefined) => {
    if (!timestamp) return 'Unknown';
    const date = timestamp.toDate();
    return date.toLocaleString();
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
                <th>ASSIGNEE</th>
                <th>COMPLETED</th>
                <th>COMMENT</th>
              </tr>
            </thead>
            <tbody>
              {doneTasks.map((task, index) => (
                <tr key={index}>
                  <td className="project-name">{task.projectName}</td>
                  <td className="task-key">{task.key}</td>
                  <td className="task-summary">{task.summary}</td>
                  <td className={`task-status ${task.status.toLowerCase().replace(' ', '-')}`}>{task.status}</td>
                  <td className="task-assignee">{task.assignee}</td>
                  <td className="task-completed">{formatTimestamp(task.completedAt)}</td>
                  <td className="task-comment">{task.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoneTaskPage;