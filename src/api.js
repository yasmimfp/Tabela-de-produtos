import axios from 'axios';

const createAxios = axios.create({
  baseURL: 'https://localhost:5000/api/produtos' ,
});

export default createAxios;