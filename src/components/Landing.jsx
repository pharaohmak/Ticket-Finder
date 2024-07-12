import React, { useState, useRef, useEffect } from "react";
import landing from "../assets/landing.png";
import search from "../assets/search.svg";

function Landing() {
  const [query, setQuery] = useState("");
  const searchInputRef = useRef("");
  const searchButtonRef = useRef("");

  useEffect(() => {
    const handleSearch = () => {
      const searchQuery = query.trim();
      if (searchQuery === "") {
        alert("Please enter a search query.");
        return;
      }
      localStorage.setItem("searchQuery", searchQuery);
      window.location.href = "/search";
    };

    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    };

    const searchButton = searchButtonRef.current;
    const searchInput = searchInputRef.current;

    if (searchButton && searchInput) {
      searchButton.addEventListener("click", handleSearch);
      searchInput.addEventListener("keypress", handleKeyPress);
    }

    // Clean up event listeners on unmount
    return () => {
      if (searchButton && searchInput) {
        searchButton.removeEventListener("click", handleSearch);
        searchInput.removeEventListener("keypress", handleKeyPress);
      }
    };
  }, [query]);

  return (
    <>
      <header className="landing__header">
        <h1 className="landing__header--title">
          Experience the Magic Live: Book Tickets for Upcoming Events!
        </h1>
        <h2 className="landing__header--subtitle">
          Look up and find events, attractions, venues, and classifications
        </h2>
        <div className="input__wrapper">
          <input
            id="search-input"
            className="search__input landing__search--input"
            type="text"
            placeholder="Search by Artists, Locations, or Dates . . ."
            ref={searchInputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search__btn" ref={searchButtonRef}>
            <div id="search-icon" className="search__icon--wrapper">
              <img src={search} alt="Search" className="search__icon" />
            </div>
          </button>
        </div>
        <div className="header__img--wrapper">
          <img src={landing} alt="Landing" />
        </div>
      </header>
    </>
  );
}

export default Landing;