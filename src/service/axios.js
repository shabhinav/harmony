import axios from 'axios'

// Add a request interceptor
axios.interceptors.request.use(
    config => {
        config.headers['Authorization'] = 'jLbFuwHoKARptIlP';
        return config;
    },
    error => {
        Promise.reject(error)
    });

//Add a response interceptor
axios.interceptors.response.use((response) => {
    return response
}, function (error) {
    return Promise.reject(error);
});