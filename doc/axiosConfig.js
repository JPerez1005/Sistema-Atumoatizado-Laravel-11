import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:8000';

axios.interceptors.request.use(config => {
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    if (token) {
        config.headers['X-XSRF-TOKEN'] = token;
    }
    return config;
});

export default axios;
