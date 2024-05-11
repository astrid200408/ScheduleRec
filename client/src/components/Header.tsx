import React from "react";
import "../styles/header.css";
const imageLink =
  "https://1000logos.net/wp-content/uploads/2022/05/Brown-University-Logo.png";
const Header = () => {
  return (
    <header className="header">
      {/* <div className="profile">Profile</div> */}
      <img
        className="brown-image"
        src={imageLink}
        alt="Brown University logo"
        aria-label="Brown University logo"
        aria-description="Brown University logo and Brown"
      />
      <div className="title">The Critical Schedule Maker</div>
      <div className="about"> </div>
    </header>
  );
};

export default Header;
