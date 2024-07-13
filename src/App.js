import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Nav from "./components/Nav";
import EventDetails from './ui/EventDetails'
import Overlay from "./ui/Overlay";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="/search" element={<Search />} />
            <Route exact path="/event-details" element={<EventDetails/>}/>
            <Route exact path="/overlay" element={Overlay} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
