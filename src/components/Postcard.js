// src/components/PostCard.js
import React from 'react';
import './PostCard.css';

const PostCard = ({ post }) => {
  const handleLike = () => {

    console.log('Liked post:', post.title);
  };

  const handleRequest = () => {
    alert('Request sent to author: ' + post.email);
  };

  return (
    <div className="post-card">
      <h3 className="post-title">{post.title}</h3>

      <div className="post-image-container">
        <img
          src={`/uploads/${post.fileName}`}
          alt={post.title}
          className="post-image"
        />
      </div>

      <div className="post-details">
        <p><strong>Author:</strong> {post.author}</p>

        <div className="post-actions">
          <button className="like-btn" onClick={handleLike}>
            ❤️ {post.likes}
          </button>

          {post.access === 'public' ? (
            <a
              className="download-btn"
              href={`/uploads/${post.fileName}`}
              download
            >
              ⬇️ Download
            </a>
          ) : (
            <button className="request-btn" onClick={handleRequest}>
              🔒 Request Access
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
