import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

const NewsPage = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines?apiKey=54ef05d46ca140918485fe33bbeb985f');
        setNewsArticles(response.data.articles);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className='news-page'>
      {loading ? (
        <div className="spinner-container">
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" size="sm" />
        </div>
      ) : (
        <div className="news-articles">
          {newsArticles.map((article, index) => (
            <div className="news-article" key={index} onClick={() => window.open(article.url, '_blank')}>
              <img src={article.urlToImage} alt="article" />
              <p>{article.title.slice(0, 40)}...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsPage;
