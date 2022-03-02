import axios from 'axios';

export const URL = 'https://hungry-woolly-leech.glitch.me'

export const fetchFirstPage = () => {
    return axios.get(`${URL}/api/pokemon`)
    .then((res) => res)
    .catch((err) => console.error(err))
}

export const fetchXPage = (token) => {
    return axios.get(`${URL}/api/pokemon?page=${token}`)
    .then((res) => res)
    .catch((err) => console.error(err))
}