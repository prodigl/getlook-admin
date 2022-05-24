import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { CgClose } from "react-icons/cg";

const Navbar = () => {
  const [isMenuClick, setIsMenuClick] = useState(false);
  //toggle functionality
  const menuIconChange = () => {
    setIsMenuClick(!isMenuClick);
  };

  return (
    <>
      <div className="container pt-4 pb-2 d-flex justify-content-between">
        <div>
          <Link to="/" className="navbar-brand">
            Admin Panel
          </Link>
        </div>

        <div className="menu-div">
          <div className="menu-icon-div" onClick={menuIconChange}>
            {isMenuClick ? <CgClose /> : <HiMenuAlt3 />}
          </div>
          {isMenuClick && (
            <div className="menus">
              <ul className="list-unstyled">
                <li className="nav-item">
                  <div className="menu-icon">
                    <img
                      src="Assets/user.png"
                      className="img-fluid"
                      alt="about"
                    />
                  </div>
                  <Link to="/" className="nav-link active" aria-current="page">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <div className="menu-icon">
                    <img
                      src="Assets/draft.png"
                      className="img-fluid"
                      alt="about"
                    />
                  </div>
                  <Link to="/" className="nav-link active">
                    Log Out
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
