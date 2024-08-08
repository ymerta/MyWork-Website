import React, { useState, useEffect } from 'react';
import { getDocs, collection, deleteDoc, doc, updateDoc, arrayUnion, addDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { isAdmin, createProject } from '../authService';
import '../styles/PersonListStyle.css';
import defaultProfilePictureUrl from '../styles/img/def-user-pic.webp';

interface User {
  id: string;
  name: string;
  email: string;
  profilePictureUrl?: string;
}

interface Task {
  assignee: string;
  comment: string;
  key: string;
  status: string;
  summary: string;
}

interface Project {
  id: string;
  name: string;
  tasks?: Task[];
}

const PersonList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [admin, setAdmin] = useState<boolean>(false);
  const [newProjectName, setNewProjectName] = useState<string>('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [task, setTask] = useState<Omit<Task, 'key' | 'status'>>({
    assignee: '',
    comment: '',
    summary: '',
  });
  const [newUser, setNewUser] = useState<Omit<User, 'id'>>({
    name: '',
    email: '',
    profilePictureUrl: '',
  });


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const usersList: User[] = usersSnapshot.docs.map((doc) => {
          const data = doc.data() as Omit<User, 'id'>;
          return {
            id: doc.id,
            ...data,
          };
        });
        setUsers(usersList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchProjects = async () => {
      try {
        const projectsSnapshot = await getDocs(collection(db, 'projects'));
        const projectsList: Project[] = projectsSnapshot.docs.map((doc) => {
          const data = doc.data() as Omit<Project, 'id'>;
          return {
            id: doc.id,
            tasks: [],
            ...data,
          };
        });
        setProjects(projectsList);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    const checkAdminStatus = async () => {
      try {
        const isAdminUser = await isAdmin();
        setAdmin(isAdminUser);
      } catch (error) {
        console.error('Error checking admin status:', error);
      }
    };

    fetchUsers();
    fetchProjects();
    checkAdminStatus();
  }, []);

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteDoc(doc(db, 'users', userId));
      setUsers(users.filter((user) => user.id !== userId));
      alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) {
      alert('Please enter a valid project name');
      return;
    }

    try {
      const projectId = await createProject(newProjectName);
      setNewProjectName('');
      alert('Project created successfully');

      setProjects((prevProjects) => [
        ...prevProjects,
        { id: projectId, name: newProjectName, tasks: [] },
      ]);
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project');
    }
  };

  const handleAddTask = async () => {
    if (!selectedProject) {
      alert('Please select a project for the task');
      return;
    }

    if (!task.assignee.trim() || !task.summary.trim()) {
      alert('Please fill in all the required task fields');
      return;
    }

    try {
      const projectRef = doc(db, 'projects', selectedProject);

      const projectDoc = await getDoc(projectRef);
      const projectData = projectDoc.data() as Project;

      const nextTaskKeyNumber = projectData.tasks ? projectData.tasks.length + 1 : 1;
      const nextTaskKey = `#${nextTaskKeyNumber}`;

      const newTask: Task = {
        ...task,
        key: nextTaskKey,
        status: 'TO DO',
      };

      await updateDoc(projectRef, {
        tasks: arrayUnion(newTask),
      });

      setTask({
        assignee: '',
        comment: '',
        summary: '',
      });
      alert('Task added successfully');
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Failed to add task');
    }
  };

  const handleAddUser = async () => {
    if (!newUser.name.trim() || !newUser.email.trim()) {
      alert('Please fill in all the required user fields');
      return;
    }

    try {
      await addDoc(collection(db, 'users'), {
        ...newUser,
        profilePictureUrl: defaultProfilePictureUrl,
      });

      setNewUser({
        name: '',
        email: '',
        profilePictureUrl: '',
      });

      alert('User added successfully');
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user');
    }
  };

  return (
    <div className="person-list-page">
      <h2>Person List</h2>
      {admin && (
        <div className="admin-actions">
          <h3>Add New User</h3>
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <button onClick={handleAddUser}>Add User</button>
        </div>
      )}
      <div className="user-list-container">
        <ul className="user-list">
          {users.map((user) => (
            <li key={user.id} className="user-item">
              <img src={user.profilePictureUrl || defaultProfilePictureUrl} alt={user.name} className="profile-picture" />
              <div>
                <h3>{user.name}</h3>
                <p>{user.email}</p>
              </div>
              {admin && (
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              )}
            </li>
          ))}
        </ul>
      </div>

      {admin && (
        <div className="admin-actions">
          <h3>Create New Project</h3>
          <input
            type="text"
            placeholder="Project Name"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
          <button onClick={handleCreateProject}>Create Project</button>

          <h3>Add Task to Project</h3>
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            <option value="" disabled>Select Project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>

          <select
            value={task.assignee}
            onChange={(e) => setTask({ ...task, assignee: e.target.value })}
          >
            <option value="" disabled>Select Assignee</option>
            {users.map((user) => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Summary"
            value={task.summary}
            onChange={(e) => setTask({ ...task, summary: e.target.value })}
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
      )}
    </div>
  );
};

export default PersonList;