// src/components/Sidebar.tsx

import React, { useState } from 'react';
import menuIcon from '../styles/img/menu.svg';
import socialIcon from '../styles/img/social.svg';
import infoIcon from '../images/info.svg';
import taskIcon from '../images/tasks.svg';
import newsIcon from '../images/news.svg'; 
import doneTaskIcon from '../images/donetasks.svg'; 
import personListIcon from '../images/personlist.svg'; 
import '../styles/Sidebar.css';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  isHomePage: boolean; 
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, isHomePage }) => {
  const [areItemsVisible, setAreItemsVisible] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleItemsVisibility = () => {
    setAreItemsVisible(prevState => !prevState);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <a className="navbar-b" href="#" onClick={() => setActivePage('Home')}>
        MyWork
      </a>
      <div className="sidebar-header" onClick={toggleItemsVisibility}>
        <img src={menuIcon} alt="Menu Icon" onClick={toggleSidebar} />
      </div>
      <ul className={`sidebar-nav ${areItemsVisible ? 'visible' : 'hidden'}`}>
        {isHomePage ? (
          <>
            <li className={`sidebar-item ${activePage === 'News' ? 'active' : ''}`}>
              <a onClick={() => setActivePage('News')}><img src={newsIcon} alt="News Icon" /> News</a>
            </li> 
            <li className={`sidebar-item ${activePage === 'Tasks Page' ? 'active' : ''}`}>
              <a onClick={() => setActivePage('Tasks Page')}><img src={taskIcon} alt="Tasks Icon" /> Tasks</a>
            </li>
            <li className={`sidebar-item ${activePage === 'Done Task' ? 'active' : ''}`}>
              <a onClick={() => setActivePage('Done Task')}><img src={doneTaskIcon} alt="Done Task Icon" /> Done Task</a>
            </li>
            <li className={`sidebar-item ${activePage === 'Person List' ? 'active' : ''}`}>
              <a onClick={() => setActivePage('Person List')}><img src={personListIcon} alt="Person List Icon" /> Person List</a>
            </li>
          </>
        ) : (
          <>
            <li className={`sidebar-item ${activePage === 'Info' ? 'active' : ''}`}>
              <a onClick={() => setActivePage('Info')}><img src={infoIcon} alt="Info Icon" /> Info</a>
            </li>
            <li className={`sidebar-item ${activePage === 'Tasks' ? 'active' : ''}`}>
              <a onClick={() => setActivePage('Tasks')}><img src={taskIcon} alt="Tasks Icon" /> Tasks</a>
            </li>
          </>
        )}
      </ul>
      <div className="sidebar-footer">
        <a href="#"><img src={socialIcon} alt="Social Icon" /></a>
      </div>
    </div>
  );
};

export default Sidebar;