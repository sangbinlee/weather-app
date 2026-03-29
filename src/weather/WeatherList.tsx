import { Weather } from './Weather';
import { CityWeather } from '../models/CityWeather';

interface WeatherListProps {
  cities: CityWeather[];
  onDelete: (cityName: string) => void;
}


const WeatherList = ({ cities, onDelete  }: WeatherListProps) => {
  return (
    <div data-testid="favorite-cities" className="favorite-cities">
      {cities.map((city) => (
        <Weather key={city.name} cityWeather={city} onDelete={onDelete} />
      ))}
    </div>
  );
};

export { WeatherList };
