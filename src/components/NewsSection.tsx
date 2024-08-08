// NewsSection.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/NewsSectionStyle.css';

interface NewsArticle {
  title: string;
  abstract: string; 
  multimedia: { url: string }[]; 
  published_date: string; 
  section: string; 
  url: string;
  byline: string;
  updated_date: string; 
}

const NewsSection: React.FC = () => {
  const [hotTopic, setHotTopic] = useState<NewsArticle | null>(null);
  const [latestNews, setLatestNews] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=uwSeAMpoA1MEC3fY5Ih8zExs6gADForC`
        );

        const articles = response.data.results.map((article: any) => ({
          title: article.title,
          abstract: article.abstract,
          multimedia: article.multimedia,
          published_date: article.published_date,
          section: article.section,
          url: article.url,
          byline: article.byline, 
          updated_date: article.updated_date, 
        }));

        if (articles.length > 0) {
          setHotTopic(articles[0]);
          setLatestNews(articles.slice(1, 4));
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="news-section">
      <h2>Hot Topic</h2>
      <div className="hot-topic">
        {hotTopic && (
          <div
            className="hot-topic-card"
            style={{
              backgroundImage: `url(${
                hotTopic.multimedia[0]?.url || 'default-image-url.jpg'
              })`,
            }}
          >
            <div className="overlay">
              <h3>{hotTopic.title}</h3>
              <p>
                {formatTime(hotTopic.updated_date)} | {hotTopic.byline || 'New York Times'}
              </p>
            </div>
          </div>
        )}
      </div>
      <h2>Latest News</h2>
      <div className="latest-news">
        <div className="news-cards">
          {latestNews.map((article, index) => (
            <div className="news-card" key={index}>
              <img
                src={article.multimedia[0]?.url || 'default-image-url.jpg'}
                alt={article.title}
              />
              <div className="news-content">
                <h4>{article.title}</h4>
                <p>
                  {formatTime(article.updated_date)} | {article.byline || 'New York Times'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsSection;