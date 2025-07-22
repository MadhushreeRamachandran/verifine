import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import CertificateTemplate from './CertificateTemplate';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './Upload.css';

const UploadPost = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [email, setEmail] = useState('');
  const [genre, setGenre] = useState('');
  const [access, setAccess] = useState('public');
  const [paymentModel, setPaymentModel] = useState('');
  const [file, setFile] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  const [lastUploadedPost, setLastUploadedPost] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      title,
      author,
      email,
      genre,
      access,
      paymentModel: access === 'private' ? paymentModel : '',
      fileName: file?.name,
      likes: 0,
      timestamp: new Date().toISOString(),
    };

    try {
      const res = await axios.post('http://localhost:5000/posts', newPost);
      setSuccessMsg('✅ Post uploaded successfully!');
      setLastUploadedPost(res.data); 
      // Reset form
      setTitle('');
      setAuthor('');
      setEmail('');
      setGenre('');
      setAccess('public');
      setPaymentModel('');
      setFile(null);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const downloadCertificate = async () => {
    const certDiv = document.getElementById('uploaded-certificate');
    if (!certDiv) return;

    const canvas = await html2canvas(certDiv);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('landscape', 'pt', 'a4');
    pdf.addImage(imgData, 'PNG', 20, 20, 750, 530);
    pdf.save(`Certificate-${lastUploadedPost.title}.pdf`);
  };

  return (
    <div className="upload-container">
      <Navbar />
      <h2>Upload Your Work</h2>
      <form className="upload-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="Author Name" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        <input type="email" placeholder="Author Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} required />

        <div className="access-options">
          <label>
            <input type="radio" value="public" checked={access === 'public'} onChange={() => setAccess('public')} />
            Public
          </label>
          <label>
            <input type="radio" value="private" checked={access === 'private'} onChange={() => setAccess('private')} />
            Private
          </label>
        </div>

        {access === 'private' && (
          <input
            type="text"
            placeholder="Enter Payment Model (e.g., ₹99/view)"
            value={paymentModel}
            onChange={(e) => setPaymentModel(e.target.value)}
            required
          />
        )}

        <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
        <button type="submit">Upload</button>
        {successMsg && <p className="success">{successMsg}</p>}
      </form>

      {lastUploadedPost && (
        <div className="certificate-preview">
          <h3>🎓 Your Certificate:</h3>
          <div id="uploaded-certificate">
            <CertificateTemplate post={lastUploadedPost} />
          </div>
          <button onClick={downloadCertificate}>Download Certificate PDF</button>
        </div>
      )}
    </div>
  );
};

export default UploadPost;
