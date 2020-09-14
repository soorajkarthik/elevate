import Axios from 'axios';
import { BASE_URL } from '../constants/Values';
export const updateToken = (deviceToken, authToken) => {
  Axios.put(
    `${BASE_URL}/users/deviceTokens`,
    { token: deviceToken },
    { headers: { Authorization: `Bearer ${authToken}` } },
  )
    .then((result) => console.log(result.data))
    .catch((error) => console.log(error.response.data.message));
};
