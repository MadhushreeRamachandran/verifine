import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import Navbar from './Navbar';

export default function Home() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleLike = (id) => {
    const postToLike = posts.find(p => p.id === id);
    const updatedPost = { ...postToLike, likes: postToLike.likes + 1 };

    try {
    axios.put(`http://localhost:5000/posts/${id}`, updatedPost);
      setPosts(posts.map(p => (p.id === id ? updatedPost : p)));
    } catch (error) {
      console.error('Like failed:', error);
    }
  };

  const handleRequestAccess = (authorEmail) => {
    alert(`Request sent to author: ${authorEmail}`);
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.author.toLowerCase().includes(search.toLowerCase()) ||
    post.genre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-page">
      <Navbar />
      <button className="logout-btn" onClick={handleLogout}>Logout</button>

      <div className="home-content">
        
        <div className="search-container">
          <input
            type="text" className="styled-search-bar"
            placeholder="🔍 Search by title, author, or genre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="post-list-horizontal">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <div key={post.id} className="post-card-horizontal">
                <h3 className="post-title">{post.title}</h3>

                <div className="post-image-wrapper">
                  <img
                    src={post.fileName}
                    alt={post.title}
                    className="post-image"   style={{ width: '300px', height: '200px', borderRadius: '10px' }}
                  />
                </div>

                <p><strong>Author:</strong> {post.author}</p>

                <div className="like-download-section">
                  <button onClick={() => handleLike(post.id)} className="like-button">
                    ❤️ {post.likes}
                  </button>

                  {post.access.toLowerCase() === 'public' ? (
                    <a href={post.fileName} download className="download-button">
                      ⬇️ Download
                    </a>
                  ) : (
                    <button
                      className="request-button"
                      onClick={() => handleRequestAccess(post.email)}
                    >Request Access
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="no-posts-msg">No posts found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
