import axios from 'axios';

const axiosService = axios.create({
    baseURL: `api/`
});

export default axiosService;