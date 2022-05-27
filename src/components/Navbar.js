import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import { filterContext } from "../context";
import City from "./Filters/City";
import Owner from "./Filters/Owner";
import Day from "./Filters/Day";
import { cities } from "../utils/city";
import { owner } from "../utils/owner";
import { days } from "../utils/day";

const Navbar = ({ value, onChange }) => {
  const [isMenuClick, setIsMenuClick] = useState(false);
  //toggle functionality
  const menuIconChange = () => {
    setIsMenuClick(!isMenuClick);
  };

  const divRef = useRef();
  // useEffect(() => {
  //   const closeMenu = (e) => {
  //     if (divRef.current && !divRef.current.contains(e.target)) {
  //       setIsMenuClick(false);
  //     }
  //     console.log(e);
  //   };

  //   document.body.addEventListener("click", closeMenu);

  //   return () => {
  //     document.body.removeEventListener("click", closeMenu);
  //   };
  // }, [divRef]);

  return (
    <>
      <div className="container-fluid d-flex justify-content-between navbarContainer">
        <Link to="/" className="navbar-brand">
          <img
            src="Assets/getlook_logo.svg"
            alt="logo"
            className="img-fluid"
            width={180}
          />
        </Link>

        <div className="menu-div">
          <div ref={divRef} className="menu-icon-div" onClick={menuIconChange}>
            {isMenuClick ? <CgClose /> : <HiMenu />}
          </div>
          <>
            {isMenuClick && (
              <div className="menus-parent">
                <div onClick={menuIconChange} className="no-menus"></div>
                <div className="menus">
                  <div className="container-fluid filter-container-mobile">
                    <div className="row mx-0">
                      <div className="col-12 col-lg-4">
                        {/* city filter */}
                        <div className="filter">
                          <label htmlFor="cities">City:</label>
                          <br />
                          <select
                            value={value.city}
                            onChange={onChange}
                            name="city"
                            id="cities"
                          >
                            <option value="">All</option>
                            {cities.sort().map((item, index) => {
                              return (
                                <option key={index} value={item}>
                                  {item}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="col-12 col-lg-4 my-2 my-md-0">
                        {/* owner filter */}
                        <div className="filter">
                          <label htmlFor="owners">Owner:</label>
                          <br />
                          <select
                            value={value.owner}
                            onChange={onChange}
                            name="owner"
                            id="owners"
                          >
                            <option value="">All</option>
                            {owner.sort().map((item, index) => {
                              return (
                                <option key={index} value={item.id}>
                                  {item.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="col-12 col-lg-4 my-2 my-md-0">
                        {/* days filter */}
                        <div className="filter">
                          <label htmlFor="days">Day:</label>
                          <br />
                          <select
                            value={value.days}
                            onChange={onChange}
                            name="days"
                            id="days"
                          >
                            <option value={days[0].value}>All</option>
                            {days.map((item, index) => {
                              return (
                                <option key={index} value={item.value}>
                                  {item.content} {item.value}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default Navbar;
