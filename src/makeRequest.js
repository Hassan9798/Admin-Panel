import axios from 'axios';
const BASE_URL='http://localhost:4000/api';
const storage=localStorage.length;
const currentUser=localStorage.getItem('persist:root') !== null && JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).loggedInUser;
const accessToken=currentUser!==null  && currentUser.token;
export const publicRequest=axios.create({
    baseURL:BASE_URL
});
export const userRequest=axios.create({
    baseURL:BASE_URL,
    headers:{token: `Bearer ${accessToken}`}
});