import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import Overlay from "../ui/Overlay";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle() {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? "auto" : "hidden";
  }

  function handleClose() {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  }

  return (
    <>
      <nav className="navbar">
        <Link to="/">
          <figure className="nav__img--wrapper">
            <img className="nav__logo--img" src={logo} alt="logo" />
          </figure>
        </Link>
        <div className={`nav__link--list ${isOpen ? "open" : ""}`}>
          <ul className="nav__links">
            <Link to="/">
              <li className="nav__link">HOME</li>
            </Link>
            <Link to="/search">
              <li className="nav__link">FIND EVENTS</li>
            </Link>
          </ul>
          <button className="nav__contact--btn">CONTACT</button>
        </div>
        <div
          className={`hamburger ${isOpen ? "change" : ""}`}
          onClick={handleToggle}
        >
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
      </nav>
      <Overlay isOpen={isOpen} onClose={handleClose} />
    </>
  );
}

export default Nav;