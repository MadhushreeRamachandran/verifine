import React from "react";
import "./Certificate.css";
import logo from './logo.png'

const CertificateTemplate = ({ post }) => {
  return (
    <div id="certificate" className="certificate">
      <img src={logo} alt="VeriFine Logo" className="logo-certificate" />
      <h1>Certificate of Upload</h1>
      <p>This certifies that <strong>{post.author}</strong></p>
      <p>has the ownership rights for  a post titled</p>
      <h2>“{post.title}”</h2>
      <p>under the genre <strong>{post.genre}</strong></p>
      <p>Access Type: <strong>{post.access}</strong></p>
      <p>Date: <strong>{new Date().toLocaleDateString()}</strong></p>
      <p className="footer">Powered by VeriFine</p>
    </div>
  );
};

export default CertificateTemplate;
