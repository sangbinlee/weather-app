import { CityWeather } from '../models/CityWeather';

import './weather.css';

interface WeatherProps {
    cityWeather: CityWeather;
    onDelete: (cityName: string) => void;
}


const Weather = ({ cityWeather , onDelete}: WeatherProps) => {
  if (cityWeather) {
    return (
      <div className="city weather-container">
        <div>
          <button
              className="delete-btn"
              onClick={() => onDelete(cityWeather.name)}   // ✅ cityWeather.name 사용
          >
              ×
          </button>
        </div>
        <h3>{cityWeather.name}</h3>
        <div className="details">
          <span className="temperature">{cityWeather.temperature}</span>
          <div className="weather">
            <span className="weather-category">{cityWeather.main}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export { Weather };
