
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth, db } from './firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Contact from './components/ContactUs';
import Tasks from './components/Tasks';
import AboutUs from './components/AboutUsCard';
import Profile from './components/Profile';
import NewsPage from './components/NewsPage';
import DoneTasksPage from './components/DoneTaskPage';
import PersonListPage from './components/PersonList';
import TasksPage from './components/TasksPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import './App.css';

interface UserData {
  name: string;
  email: string;
  password: string;
  profilePicture: string;
  isAdmin?: boolean; 
}

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('login');
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    password: '',
    profilePicture: '',
  });
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {  
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const userInfo = userDoc.data() as UserData;
          setUserData(userInfo);
          setIsAdmin(userInfo.isAdmin || false);
        }
      }
    };

    checkAdminStatus();
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case 'login':
        return <LoginPage setActivePage={setActivePage} />;
      case 'register':
        return <RegisterPage setActivePage={setActivePage} setUserData={setUserData} />;
      case 'News':
        return <NewsPage />;
      case 'Info':
        return <Profile userData={userData} />;
      case 'About Us':
        return <AboutUs />;
      case 'Contact':
        return <Contact />;
      case 'Tasks':
        return <Tasks />;
      case 'Tasks Page':
        return  <TasksPage />
      case 'Done Task':
        return <DoneTasksPage />;
      case 'Person List':
        return <PersonListPage />;
      default:
        return <NewsPage />;
    }
  };

  const handlePageChange = (page: string) => {
    if (page === 'Home') {
      setActivePage('News');
    } else {
      setActivePage(page);
    }
  };

  return (
    <div className="App">
      {activePage !== 'login' && activePage !== 'register' && (
        <Header activePage={activePage} setActivePage={handlePageChange} />
      )}
      {activePage !== 'About Us' && activePage !== 'Contact' && activePage !== 'login' && activePage !== 'register' && (
        <Sidebar
          activePage={activePage}
          setActivePage={handlePageChange}
          isHomePage={
            activePage === 'News' || activePage === 'Done Task' || activePage === 'Person List' || activePage === 'Tasks Page'
          }
        />
      )}
      <div className={`content ${activePage === 'About Us' || activePage === 'Contact' ? 'full-width' : ''}`}>
        {renderPage()}
      </div>
    </div>
  );
};

export default App;