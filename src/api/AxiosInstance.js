import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const useAxiosInstance = () => {
    const navigate = useNavigate();

    const AxiosInstance = axios.create({
        baseURL: 'http://localhost:5000',
    });

    AxiosInstance.interceptors.request.use(
        (config) => {
            let token = localStorage.getItem('auth');

            if (token) {
                // Removing double quotes from token if present
                token = token.replace(/^"|"$/g, '');
                config.headers.Authorization = `Bearer ${token}`;
                console.warn('auth ' + token);
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    AxiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                console.warn('Token expired or invalid');
                localStorage.removeItem('auth');
                localStorage.removeItem('user');
                navigate('/login');
                toast.info('Your session has expired. Please log in again.');
            }
            return Promise.reject(error);
        }
    );

    return AxiosInstance;
};

export default useAxiosInstance;
