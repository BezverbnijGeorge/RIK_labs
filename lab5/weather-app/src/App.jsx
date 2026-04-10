import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WeatherHome from './pages/WeatherHome';
import Statistics from './pages/Statistics';
import About from './pages/About';

import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [cityInfo, setCityInfo] = useState({ city: 'Київ', country: 'Україна', lat: 50.45, lon: 30.52 });

  return (
    <Router>
      <div className="app-wrapper">
        <nav className="navbar">
          <div className="nav-logo">WeatherApp</div>
            <div className="nav-links">
              <Link to="/" className="nav-item">Погода</Link>
              <Link to="/stats" className="nav-item">Статистика</Link>
              <Link to="/about" className="nav-item">Про проєкт</Link>
            </div>
          </nav>

        <Routes>
          <Route path="/" element={<WeatherHome setWeatherData={setWeatherData} setCityInfo={setCityInfo} weatherData={weatherData} cityInfo={cityInfo} />} />
          <Route path="/stats" element={<Statistics weatherData={weatherData} cityInfo={cityInfo} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;