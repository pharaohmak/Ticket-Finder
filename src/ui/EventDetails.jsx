import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const EventDetails = ({ eventDetails, onBack }) => {
  const attractionsHTML = (event) => {
    const attraction = event._embedded.attractions
      ? event._embedded.attractions[0]
      : { name: "N/A", classifications: [{ genre: { name: "N/A" } }] };

    return (
      <div className="panel panel-primary">
        <div className="panel-body post">
          <h4 className="list-group-item-heading post__title">
            {attraction.name}
          </h4>
          <div className="post__body">
            <figure className="attraction__img--wrapper">
              <img
                className="col-xs-12 cla attraction__img"
                src={attraction.images ? attraction.images[0].url : ""}
                alt=""
              />
            </figure>

            <p id="classification" className="genre">
              <span>Genre: </span>
              {attraction.classifications
                ? attraction.classifications[0].genre.name
                : "N/A"}
            </p>
            <a href={event.url} target="_blank" rel="noopener noreferrer">
              {event.url}
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div id="attraction-panel">
      <button onClick={onBack} className="back-button"><img src="https://www.flaticon.com/free-icons/back" className="back icons" alt="" />Back</button>
      {eventDetails ? (
        attractionsHTML(eventDetails)
      ) : (
        <p>Failed to fetch event details.</p>
      )}
    </div>
  );
};

export default EventDetails;
