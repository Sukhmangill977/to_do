import axios from 'axios';

const API_KEY = 'a874ed583d18404a870182431241309'; // Replace with your WeatherAPI key
const BASE_URL = 'http://api.weatherapi.com/v1';

export const fetchWeather = async (location) => {
  try {
    const response = await axios.get(`${BASE_URL}/current.json`, {
      params: {
        key: API_KEY,
        q: location,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
