import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import '../styles/TaskStyle.css';

interface Task {
  key: string;
  summary: string;
  status: string;
  assignee: string;
  projectName: string;
}

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const projectsSnapshot = await getDocs(collection(db, 'projects'));
        
        const allTasks: Task[] = [];
        projectsSnapshot.forEach((projectDoc) => {
          const projectData = projectDoc.data() as { tasks: Task[]; name: string };
          const projectTasks = projectData.tasks || [];
          
          projectTasks.forEach((task) => {
            allTasks.push({
              key: task.key,
              summary: task.summary,
              status: task.status,
              assignee: task.assignee,
              projectName: projectData.name, 
            });
          });
        });

        setTasks(allTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

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
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td className="project-name">{task.projectName}</td>
                  <td className="task-key">{task.key}</td>
                  <td className="task-summary">{task.summary}</td>
                  <td className={`task-status ${task.status.toLowerCase().replace(" ", "-")}`}>{task.status}</td>
                  <td className="task-assignee">{task.assignee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;