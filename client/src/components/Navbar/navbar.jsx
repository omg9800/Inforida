import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import logo from "../../logo.svg";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <div className="logo">
          <Link to="/">
            <img className="logo-img" src={logo} alt="" />
          </Link>
        </div>
      </div>

      <div className="navbar-right">
        <ul>
          <li className="li-item">
            <Link to="#" className="li-link">
              Home
            </Link>
          </li>
          <li className="li-item">
            <Link to="#" className="li-link">
              About Us
            </Link>
          </li>
          <li className="li-item">
            <Link to="#" className="li-link">
              Blogs
            </Link>
          </li>
          <li className="li-item">
            <Link to="#" className="li-link">
              Contact Us
            </Link>
          </li>
          <li className="li-item">
            <Link to="#" className="li-link" onClick={logout}>
              {user ? "Logout" : "Login"}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
