import React from "react";
import "./Navbar.css";
import menu_icon from "../../assets/hamburger.png";
import logo from "../../assets/logo4.png";
import search_icon from "../../assets/search.png";
import upload_icon from "../../assets/upload.png";
import notification_icon from "../../assets/notification.png";
import profile_icon from "../../assets/jack.png";
import voice_search from "../../assets/voice_search.png";

import { Link } from "react-router-dom";

function Navabar({ setSidebar }) {
  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <img
          onClick={() => setSidebar((prev) => !prev)}
          className="menu-icon"
          src={menu_icon}
          alt=""
        />
        <Link to="/">
          <img className="logo"  src={logo} alt="" />
        </Link>
      </div>

      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input type="text" placeholder="Search" />
          <img className="search-icon" src={search_icon} alt="" />
        </div>

        <img className="voice-search" src={voice_search} alt="" />
      </div>

      <div className="nav-right flex-div">
        <img src={upload_icon} alt="" />
        <img src={notification_icon} alt="" />
        <img className="user-icon" src={profile_icon} alt="" />
      </div>
    </nav>
  );
}

export default Navabar;
