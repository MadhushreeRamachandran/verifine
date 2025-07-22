import React, { useEffect, useState } from "react";
import CertificateTemplate from "./CertificateTemplate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./verify.css";
import Navbar from "./Navbar";

const Verify = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.reverse()));
  }, []);

  const downloadCertificate = async  (post) => {
    const certDiv = document.getElementById(`cert-${post.id}`);
    if (!certDiv) return;

    const canvas = await html2canvas(certDiv);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape", "pt", "a4");
    pdf.addImage(imgData, "PNG", 20, 20, 750, 530);
    pdf.save(`Certificate-${post.title}.pdf`);
  };

  return (
    <div className="verify-page">
      <Navbar/>
      <h1>Your Uploaded Certificates</h1>
      <div className="cert-list">
        {posts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="cert-item">
              <div id={`cert-${post.id}`} className="cert-preview">
                <CertificateTemplate post={post} />
              </div>
              <button onClick={() => downloadCertificate(post)}>
                Download PDF
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Verify;
