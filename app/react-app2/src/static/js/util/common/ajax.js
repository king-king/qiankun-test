import axios from 'axios';

// Add a request interceptor
axios.interceptors.request.use(config => {
    // Do something before request is sent
    return config;
}, error => {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(response => {
    // Do something with response data
    return response;
}, error => {
    // Do something with response error
    return Promise.reject(error);
});


const $get = options => axios({ ...options, method: 'get' });

const $post = options => axios({ ...options, method: 'post' });

export { $get, $post };
export default { $get, $post };
