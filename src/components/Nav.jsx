import React from "react";
import logo from "../assets/logo.jpeg"
import { Link } from "react-router-dom";

function Nav() {
  return (
    <>
      <nav className="navbar">
        <Link to="/">
          <figure className="nav__img--wrapper">
            <img class="nav__logo--img" src={logo} alt="logo" />
          </figure>
        </Link>
        <div className="nav__link--list">
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
      </nav>
    </>
  );
}

export default Nav;
