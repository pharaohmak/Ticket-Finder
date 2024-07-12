import React, { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import PostSkeleton from "../components/PostSkeleton";
import RangeSlider from "../components/RangeSlider";
import EventDetails from "../ui/EventDetails";

function Search() {
  const [query, setQuery] = useState(localStorage.getItem("searchQuery") || "");
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResultsText, setSearchResultsText] = useState("");
  const [eventDetails, setEventDetails] = useState(null);
  const [showAttractions, setShowAttractions] = useState(false);
  const [sliderValue, setSliderValue] = useState(50);  // Initial slider value


  const searchInputRef = useRef(null);
  const eventsListRef = useRef(null);
  const loadingRef = useRef(null);
  const hamburgerRef = useRef(null);
  const overlayRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }

    if (hamburgerRef.current && overlayRef.current && closeBtnRef.current) {
      const hamburger = hamburgerRef.current;
      const overlay = overlayRef.current;
      const closeBtn = closeBtnRef.current;

      const handleHamburgerClick = () => {
        overlay.classList.toggle("active");
      };

      const handleCloseClick = () => {
        overlay.classList.toggle("active");
      };

      hamburger.addEventListener("click", handleHamburgerClick);
      closeBtn.addEventListener("click", handleCloseClick);

      return () => {
        hamburger.removeEventListener("click", handleHamburgerClick);
        closeBtn.removeEventListener("click", handleCloseClick);
      };
    }
  }, []);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  useEffect(() => {
    filterEventsByPrice();
  }, [sliderValue, events]);

  const filterEventsByPrice = () => {
    const filtered = events.filter(event => {
      const priceRanges = event.priceRanges;
      if (priceRanges) {
        const [minPrice, maxPrice] = priceRanges[0].minmax ? priceRanges[0].minmax.split("-").map(Number) : [0, 0];
        return minPrice <= sliderValue && maxPrice >= sliderValue;
      }
      return false;
    });
    setFilteredEvents(filtered);
  };


  const handleSearch = (query) => {
    if (query.trim() === "") {
      setSearchResultsText("Please enter a search query.");
      setEvents([]);
      return;
    }

    localStorage.setItem("searchQuery", query);
    performSearch(query);
  };

  const performSearch = async (query) => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${encodeURIComponent(
          query
        )}&countryCode=US&apikey=qZWhqtApmbArpBw5qrGmoA6xfOZtpYaZ`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const eventsData = await response.json();
      setIsLoading(false);
      setSearchResultsText(`Search results for: "${query}"`);

      if (!eventsData._embedded || !eventsData._embedded.events) {
        setEvents([]);
        return;
      }

      setEvents(eventsData._embedded.events);
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to fetch events:", error);
      setEvents([]);
    }
  };

  const showEventInfo = async (event, eventId) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=qZWhqtApmbArpBw5qrGmoA6xfOZtpYaZ`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const eventData = await response.json();
      setEventDetails(eventData);
      setShowAttractions(true);
    } catch (error) {
      console.error("Failed to fetch event details:", error);
      setEventDetails(null);
    }
  };

  const handleBackToSearch = () => {
    setShowAttractions(false);
    setEventDetails(null);
  };

  const eventsHTML = (event) => {
    return (
      <div className="user" key={event.id}>
        <div className="user-card" onClick={(e) => showEventInfo(e, event.id)}>
          <div className="user-card__container">
            <h3>{event.name}</h3>
            <p>
              <b>Date: </b>
              {event.dates.start.localDate}
            </p>
            <p>
              <b>Venue:</b> {event._embedded.venues[0].name}
            </p>
            <p>{event._embedded.venues.boxOfficeInfo}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header query={query} setQuery={setQuery} handleSearch={handleSearch} />
      <RangeSlider searchResultsText={searchResultsText} sliderValue={sliderValue} setSliderValue={setSliderValue} />

      {isLoading && (
        <div id="loading__state" ref={loadingRef}>
          <PostSkeleton/>
        </div>
      )}
      <div
        id="events-panel"
        ref={eventsListRef}
        style={{ display: showAttractions ? "none" : "flex" }}
      >
        {events.length > 0 ? (
          events.map((event) => eventsHTML(event))
        ) : (
          <p>No events found.</p>
        )}
      </div>
      {showAttractions && <EventDetails eventDetails={eventDetails} onBack={handleBackToSearch} />}
    </>
  );
}

export default Search;