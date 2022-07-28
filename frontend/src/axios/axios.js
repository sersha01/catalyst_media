import axios from 'axios';

const BaseURL = 'http://localhost:8000/';

const token = () =>{ return( { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('authTokens')).access}`}})}

export const register = async (data) => await axios.post(BaseURL + 'signup', data)
export const login = async (data) => await axios.post(BaseURL + 'token', data)
export const retrieve = async () => await axios.get(BaseURL + 'retrieve', token())
export const update = async (data) => await axios.patch(BaseURL + 'update', data,token())