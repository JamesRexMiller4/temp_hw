import axios from 'axios';

export const URL = 'https://hungry-woolly-leech.glitch.me'

export const fetchFirstPage = () => {
    axios.get(`${URL}/api/pokemon`)
    .then((res) => res)
    .catch((err) => console.error(err))
}