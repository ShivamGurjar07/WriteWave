import React from "react";
import { Link } from "react-router-dom";
import "../assets/footer.css"
import { FaGithub } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io";
import { FaTwitter } from "react-icons/fa6";
import { IoLogoFacebook } from "react-icons/io5";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h2>WriteWave</h2>
          <p>A place where thoughts turn into words.</p>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">About</Link></li>
            <li><Link to="/">Contact</Link></li>
            <li><Link to="/">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://github.com/ShivamGurjar07" target="_blank" rel="noopener noreferrer">
                <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/shivamgurjar07/" target="_blank" rel="noopener noreferrer">
                <IoLogoLinkedin />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
            </a>
            <a href="https://www.facebook.com/shivam.gurjar.505" target="_blank" rel="noopener noreferrer">
                <IoLogoFacebook />
            </a>
          </div>
        </div>
        <div className="footer-section links">
          <h3>Let Us Help You</h3>
          <ul>
            <li><Link to="/">Your Account</Link></li>
            <li><Link to="/">Returns Centre</Link></li>
            <li><Link to="/">Recalls and Product Safety Alerts</Link></li>
            <li><Link to="/">Help</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} WriteWave. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
