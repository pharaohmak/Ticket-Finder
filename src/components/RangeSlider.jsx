import React from "react";

function RangeSlider({ searchResultsText, sliderValue, setSliderValue }) {
  const handleChange = (event) => {
    setSliderValue(event.target.value);
  };

  return (
    <div>
      <div className="post__search">
        <h1>{searchResultsText}</h1>
        <div className="post__search--container">

        </div>
      </div>
    </div>
  );
}

export default RangeSlider;