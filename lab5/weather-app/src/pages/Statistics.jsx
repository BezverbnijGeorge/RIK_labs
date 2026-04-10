import React from 'react';

const Statistics = ({ weatherData, cityInfo }) => {
  // Перевірка: якщо даних ще немає (місто не знайдено), показуємо повідомлення
  if (!weatherData || !weatherData.current) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '1.2rem', color: 'white' }}>
        Спочатку виберіть місто на головній сторінці.
      </div>
    );
  }

  // Для зручності витягуємо об'єкт current
  const { current } = weatherData;

  // 1. Функція: Конвертація UNIX-часу у звичайний час (напр. 06:15)
  const formatTime = (unixTime) => {
    return new Date(unixTime * 1000).toLocaleTimeString('uk-UA', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // 2. Функція: Перетворення градусів у сторони світу
  const getWindDirection = (deg) => {
    const directions = ['Пн', 'Пн-Сх', 'Сх', 'Пд-Сх', 'Пд', 'Пд-Зх', 'Зх', 'Пн-Зх'];
    const index = Math.round(((deg %= 360) < 0 ? deg + 360 : deg) / 45) % 8;
    return directions[index];
  };

  return (
    <div className="stats-container">
      <h2>Детальна статистика для: {cityInfo.city || 'Міста'}</h2>
      
      <div className="stats-grid">
        {/* Температура */}
        <div className="stat-item">
          <h3>Відчувається як</h3>
          <p>{Math.round(current.main.feels_like)}°C</p>
        </div>
        
        {/* Вологість та Тиск */}
        <div className="stat-item">
          <h3>Вологість</h3>
          <p>{current.main.humidity}%</p>
        </div>
        
        <div className="stat-item">
          <h3>Тиск</h3>
          <p>{current.main.pressure} гПа</p>
        </div>

        {/* Хмарність та Видимість */}
        <div className="stat-item">
          <h3>Хмарність</h3>
          <p>{current.clouds.all}%</p>
        </div>

        <div className="stat-item">
          <h3>Видимість</h3>
          {/* Переводимо метри в кілометри */}
          <p>{(current.visibility / 1000).toFixed(1)} км</p>
        </div>

        {/* Вітер */}
        <div className="stat-item">
          <h3>Напрямок вітру</h3>
          <p>{getWindDirection(current.wind.deg)} ({current.wind.deg}°)</p>
        </div>

        {/* Пориви вітру (бувають не завжди, тому робимо перевірку) */}
        {current.wind.gust && (
          <div className="stat-item">
            <h3>Пориви вітру</h3>
            <p>{current.wind.gust} м/с</p>
          </div>
        )}

        {/* Сонце */}
        <div className="stat-item">
          <h3>Схід сонця</h3>
          <p>🌅 {formatTime(current.sys.sunrise)}</p>
        </div>

        <div className="stat-item">
          <h3>Захід сонця</h3>
          <p>🌇 {formatTime(current.sys.sunset)}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;