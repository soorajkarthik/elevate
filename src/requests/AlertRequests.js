import Axios from 'axios';
import { BASE_URL } from '../Environment';

export const fetchAlertsViewport = async (authToken, region) => {
  return await Axios.get(
    `${ BASE_URL }/alerts?lat=${ region.latitude }&lng=${ region.longitude }&lat_delta=${ region.latitudeDelta }&lng_delta=${ region.longitudeDelta }`,
    { headers: { Authorization: `Bearer ${ authToken }` } },
  )
    .then((result) => result.data)
    .catch((error) => {
      console.log(error.response.data.message);
      return [];
    });
};
