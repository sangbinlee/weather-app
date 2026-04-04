import  { useEffect } from 'react';
import './App.css'
import { SearchResultItemType } from './models/SearchResultItemType';
import { SearchCityInput } from './search/SearchCityInput';
import {
  fetchCityWeatherData,
  useFetchCityWeather,
} from './weather/useFetchCityWeather';
import { WeatherList } from './weather/WeatherList';
import type {RemoteSearchResultItem} from "./models/RemoteSearchResultItem.ts";



function App() {


  const { cities, setCities, fetchCityWeather } = useFetchCityWeather();

  const onItemClick = (item: SearchResultItemType) => {
    setTimeout(() => {
      const items = JSON.parse(localStorage.getItem('favoriteItems') || '[]');

      const newItem = {
        name: item.city,
        lon: item.longitude,
        lat: item.latitude,
      };

      localStorage.setItem(
          'favoriteItems',
          JSON.stringify([newItem, ...items], null, 2),
      );
    }, 0);
    return fetchCityWeather(item);
  };

  // app start point.........
  // app start point.........
  // app start point.........
  // app start point.........
  useEffect(() => {
    console.log('여기가 처음타는데야??????????????');
    const items = JSON.parse(localStorage.getItem('favoriteItems') || '[]');
    console.log('데이터 길이=', items.length)
    if (items.length === 0) {
      console.log('데이터 길이=', items.length)
      return;
    } // 값 없으면 바로 종료
    const hydrate = async () => {

      // 모든 도시 이름 출력
      items.forEach((item: RemoteSearchResultItem) => {
        console.log('111111111도시이름=', item.name);
      });

      const promises = items.map((item: RemoteSearchResultItem) => {
        const searchResultItem = new SearchResultItemType(item);
        return fetchCityWeatherData(searchResultItem);
      });

      const cities = await Promise.all(promises);
      setCities(cities);
    };

    void hydrate();
  }, [setCities]);


  const onDeleteCity = (cityName: string) => {

    console.error('■■■■■■■ delete city=', cityName);
    // localStorage에서 제거
    const items = JSON.parse(localStorage.getItem('favoriteItems') || '[]');
    const newItems = items.filter((item: RemoteSearchResultItem) => item.name !== cityName);
    // 모든 도시 이름 출력
    items.forEach((item: RemoteSearchResultItem) => {
      console.log('도시이름=', item.name);
    });

    localStorage.setItem('favoriteItems', JSON.stringify(newItems, null, 2));
    // 상태에서 제거
    setCities((prevCities) => prevCities.filter((c) => c.name !== cityName));
  };//
  return (
      <div className="app">
        <h1>Weather Application</h1>
        <SearchCityInput onItemClick={onItemClick} />
        <WeatherList cities={cities} onDelete={onDeleteCity}  />
      </div>
  )
}
export default App
