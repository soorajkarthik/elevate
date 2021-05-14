import Axios from 'axios';
import { HERE_API_KEY } from '../Environment';

export const getAutoCompleteSuggestions = (query, location) => {

    url = `https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?`
        + `apikey=${ HERE_API_KEY }`
        + `&query=${ query }`
        + `&prox=${ location.latitude },${ location.longitude }`
        + `&beginHighlight=<b>`
        + `&endHighlight=</b>`;

    Axios.get(

    );
};