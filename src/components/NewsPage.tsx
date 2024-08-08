import React from 'react';
import NewsSection from './NewsSection';
import PersonListSection from './PersonsSection';
import TasksSection from './TaskSection';
import '../styles/NewsPageStyle.css';

const NewsPage: React.FC = () => {
  return (
    <div className="news-page-container">
     <div className='news-container'>
      <NewsSection />
      </div>
      <div className="bottom-sections">
        <TasksSection />
        <PersonListSection />
       </div>
      
    </div>
  );
};

export default NewsPage;
