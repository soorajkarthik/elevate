import Axios from 'axios';
import { HERE_API_KEY } from '../Environment';

export const getAutoCompleteSuggestions = async (query, location) => {

    url = `https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?`
        + `apikey=${ HERE_API_KEY }`
        + `&query=${ query }`
        + `&prox=${ location.latitude },${ location.longitude }`;

    return Axios.get(url)
        .then((response) => response.data.suggestions.map(({ address }, index) => {
            return {
                id: index,
                address: `${ address.houseNumber || "" } ${ address.street || "" }, ${ address.city || "" }, ${ address.state || "" }`
            };

        }))
        .catch((e) => {
            console.log(e.response);
            return [];
        });
};