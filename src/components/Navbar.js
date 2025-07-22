import React from "react";
import { FaHome, FaArrowUp, FaCheckSquare, FaCogs, FaGripVertical } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import  logo from './logo.png'

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidenav">
      <img src={logo}alt="Logo" className="logo" />

      <ul>
        <li>
          <Link to="/" className={isActive("/") ? "active" : ""}>
            <FaHome />
          </Link>
        </li>
        <li>
          <Link to="/upload" className={isActive("/upload") ? "active" : ""}>
            <FaArrowUp />
          </Link>
        </li>
        <li>
          <Link to="/verify" className={isActive("/verify") ? "active" : ""}>
            <FaCheckSquare />
          </Link>
        </li>
        <li>
          <Link to="/settings" className={isActive("/settings") ? "active" : ""}>
            <FaCogs />
          </Link>
        </li>
        <li>
          <Link to="/requests" className={isActive("/requests") ? "active" : ""}>
            <FaGripVertical />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
