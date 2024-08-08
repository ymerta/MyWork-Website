import React, { useState, useEffect } from 'react';
import { getDocs, collection, getDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import '../styles/TaskSectionStyle.css';

interface Task {
  key: string;
  status: string;
  assignee: string;
}

interface Project {
  id: string;
  name: string;
  tasks: Task[];
}

const TasksSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data()?.name || '');
        }
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };

    const fetchProjects = async () => {
      try {
        const projectsSnapshot = await getDocs(collection(db, 'projects'));
        const projectList: Project[] = projectsSnapshot.docs.map((projectDoc) => {
          const projectData = projectDoc.data() as { name: string; tasks: Task[] };
          return {
            id: projectDoc.id,
            name: projectData.name,
            tasks: projectData.tasks || [],
          };
        });
        setProjects(projectList);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchUserName();
    fetchProjects();
  }, []);

  const calculateCompletionPercentage = (tasks: Task[]): number => {
    if (tasks.length === 0) return 0;
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.status === 'DONE').length;
    return Math.round((completedTasks / totalTasks) * 100);
  };

  const getStatus = (percentage: number) => {
    if (percentage === 100) {
      return { label: 'Completed', className: 'completed' };
    } else if (percentage === 0) {
      return { label: 'Not Started', className: 'not-started' };
    } else {
      return { label: 'In Progress', className: 'in-progress' };
    }
  };

  return (
    <div className="tasks-section">
      <div className="tasks-card">
        <div className="task-card-body">
          <div className="task-table-container">
            <h4>Tasks</h4>
            <table className="task-section-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => {
                  const percentage = calculateCompletionPercentage(project.tasks);
                  const { label, className } = getStatus(percentage);

                  return (
                    <tr key={index}>
                      <td>
                        <div className="section-project-name">{project.name}</div>
                        <div className="progress-bar-container">
                          <div
                            className={`progress-bar ${className}`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="progress-percentage">{percentage}%</span>
                      </td>
                      <td>
                        <span className={`status ${className}`}>
                          {label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksSection;