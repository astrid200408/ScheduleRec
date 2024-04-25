import React from 'react'
import "../styles/header.css"

const Header = () => {
  return (
    <header className="header">
      <div className="profile">Profile</div>
      <div className="title">The Critical Schedule Maker</div>
      <div className="about">About</div>
    </header>
  );
}

export default Header