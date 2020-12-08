import Axios from 'axios';
import { BASE_URL } from '../Environment';

export const fetchAlerts = async (authToken, location) => {
  return await Axios.get(
    `${BASE_URL}/alerts?lat=${location.latitude}&lng=${location.longitude}&radius=4`,
    { headers: { Authorization: `Bearer ${authToken}` } },
  )
    .then((result) => result.data)
    .catch((error) => {
      console.log(error.response.data.message);
      return [];
    });
};
