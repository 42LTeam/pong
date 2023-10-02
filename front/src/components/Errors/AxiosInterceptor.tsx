import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// Create an Axios instance
const instance: AxiosInstance = axios.create({
    baseURL: 'https://example.com',
    withCredentials: true,
});

// Register interceptors
instance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
            // Handle 401 error logic here
        }
        return Promise.reject(error);
    }
);

export default instance;
