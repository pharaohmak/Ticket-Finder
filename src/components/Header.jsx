import React from "react";
import search from "../assets/search-blk.svg";

function Header({ query, setQuery, handleSearch }) {
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  return (
    <header className="search__header">
      <div className="container">
        <div className="row">
          <div className="search__header--content">
            <h1 className="search__header--title">Search For Live Events</h1>

            <div className="search__input--wrapper">
              <input
                id="search-input"
                className="search__input search-page--input"
                type="text"
                placeholder="Search by Artists, Locations, or Dates . . ."
                value={query}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
              />
              <span className="search__icon--wrapper" onClick={() => handleSearch(query)}>
                <img
                  className="search__page--icon search__icon"
                  src={search}
                  alt="search icon"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;