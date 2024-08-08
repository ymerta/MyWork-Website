// src/components/Header.tsx

import React, { useState, useEffect, useRef } from "react";
import exitImage from "../styles/img/exit.svg";
import "../styles/Header.css";
import SearchBar from "./SearchBar";

interface HeaderProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activePage, setActivePage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const prevPageRef = useRef<string>(activePage);

  useEffect(() => {
    const prevPage = prevPageRef.current;
    if (prevPage !== activePage) {
      const direction = prevPage < activePage ? "from-right" : "from-left";
      document
        .querySelector(".nav-item.active .nav-link.active")
        ?.classList.add(direction);
      prevPageRef.current = activePage;
    }
  }, [activePage]);

  const handleSearch = (query: string) => {
    console.log(`Search query: ${query}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-light bg-light navbar-expand-lg">
      {(activePage === "About Us" || activePage === "Contact") && (
        <a
          className="navbar-a"
          href="#"
          onClick={() => setActivePage("Home")}
        >
          MyWork
        </a>
      )}

      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleMenu}
        aria-controls="navbarNav"
        aria-expanded={isMenuOpen}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {(activePage === "Info" ||
        activePage === "Profile" ||
        activePage === "Tasks" ||
        activePage === "News" ||
        activePage === "Tasks Page" ||
        activePage === "Done Task" ||
        activePage === "Person List") && (
        <div className="search-bar-wrapper">
          <SearchBar placeholder="Search" onSearch={handleSearch} />
        </div>
      )}

      <div
        className={`collapse navbar-collapse ${
          isMenuOpen ? "show" : ""
        } mobile-hidden`} // Add mobile-hidden class
        id="navbarNav"
      >
        <ul className="navbar-nav ms-auto">
          <li
            className={`nav-item ${
              activePage === "Info" || activePage === "Tasks" ? "active" : ""
            }`}
          >
            <a
              className="nav-link"
              href="#"
              onClick={() => setActivePage("Info")}
            >
              Profile
            </a>
          </li>
          <li className={`nav-item ${activePage === "About Us" ? "active" : ""}`}>
            <a
              className="nav-link"
              href="#"
              onClick={() => setActivePage("About Us")}
            >
              About Us
            </a>
          </li>
          <li className={`nav-item ${activePage === "Contact" ? "active" : ""}`}>
            <a
              className="nav-link"
              href="#"
              onClick={() => setActivePage("Contact")}
            >
              Contact
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              onClick={() => setActivePage("login")}
            >
              <img src={exitImage} alt="Exit" /> Exit
            </a>
          </li>
        </ul>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-header">Menu</div>
          <ul className="mobile-menu-list">
            <li className="mobile-menu-item" onClick={() => setActivePage("Info")}>
              Profile
            </li>
            <li className="mobile-menu-item" onClick={() => setActivePage("About Us")}>
              About Us
            </li>
            <li className="mobile-menu-item" onClick={() => setActivePage("Contact")}>
              Contact
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Header;