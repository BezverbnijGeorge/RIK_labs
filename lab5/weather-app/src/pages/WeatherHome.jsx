import React, { useState } from 'react';
import MapView from './MapView';

const WeatherHome = ({ setWeatherData, setCityInfo, weatherData, cityInfo }) => {
  const [query, setQuery] = useState('');
  
  // Ваш ключ OpenWeatherMap
  const API_KEY = '983fb7b1325e27ba4c33e8dd90a28164';

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    
    try {
      
      const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${API_KEY}`);
      const geoData = await geoRes.json();
      
      if (geoData && geoData.length > 0) {
        const { lat, lon, name, country } = geoData[0];
        setCityInfo({ city: name, country: country, lat: lat, lon: lon });
        
        // 2. Отримання поточної погоди
        const currentRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=ua&appid=${API_KEY}`);
        const currentData = await currentRes.json();

        // 3. Отримання прогнозу на 5 днів (приходить з кроком у 3 години, тобто 40 записів)
        const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=ua&appid=${API_KEY}`);
        const forecastData = await forecastRes.json();

        // Фільтруємо прогноз, щоб взяти лише один запис на день (наприклад, на 12:00)
        const dailyForecast = forecastData.list.filter(item => item.dt_txt.includes('12:00:00'));

        // Зберігаємо обидва результати в один стан
        setWeatherData({
          current: currentData,
          forecast: dailyForecast
        });
      } else {
        alert("Місто не знайдено");
      }
    } catch (err) {
      alert("Помилка завантаження даних");
    }
  };

  return (
    <div className="home-page">
      <form className="search-bar" onSubmit={handleSearch}>
        <input 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Пошук міста..." 
        />
        <button type="submit">Шукати</button>
      </form>

      {weatherData && weatherData.current && (
        <div className="weather-layout">
          {/* Ліва колонка */}
          <section className="hero-card">
            <div className="location-header">
              <h1 className="city-name">{cityInfo.city || 'Київ'}</h1>
              <h2 className="country-name">{cityInfo.country || 'Україна'}</h2>
            </div>
            <div className="current-main">
              <span className="big-temp">{Math.round(weatherData.current.main.temp)}°C</span>
              <div className="weather-status">
                {/* Опис погоди (наприклад, "хмарно") */}
                <p style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                  {weatherData.current.weather[0].description}
                </p>
                <p>Вітер: {weatherData.current.wind.speed} м/с</p>
                <p>Вологість: {weatherData.current.main.humidity}%</p>
              </div>
            </div>
          </section>

          {/* Права колонка */}
          <div className="right-column">
            {/* Прогноз зверху */}
            <section className="forecast-section">
              <h3>Прогноз на 5 днів</h3>
              <div className="forecast-row">
                {weatherData.forecast.map((item, i) => (
                  <div key={item.dt} className="mini-card">
                    {/* Множимо на 1000, бо OWM повертає час у секундах, а JS працює в мілісекундах */}
                    <p className="day-name">{new Date(item.dt * 1000).toLocaleDateString('uk-UA', { weekday: 'short' })}</p>
                    
                    {/* Використовуємо рідні іконки OpenWeatherMap */}
                    <img 
                      className="mini-icon" 
                      src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} 
                      alt={item.weather[0].description} 
                      style={{ width: '60px', height: '60px', margin: '0 auto' }}
                    />
                    
                    <div className="mini-temps">
                      <span className="max">{Math.round(item.main.temp_max)}°</span>
                      {/* <span className="min">{Math.round(item.main.temp_min)}°</span> */}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Карта знизу */}
            <section className="map-section full-width-map">
              <h3>Метеорологічна карта</h3>
              <MapView 
                lat={cityInfo.lat} 
                lon={cityInfo.lon} 
                apiKey={API_KEY} 
              />
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherHome;