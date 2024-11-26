import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SESSION_EXPIRE } from '../constants/MessageConstants';
import { API_BASE_URL } from '../constants/ApiConstants';

const useAxiosInstance = () => {
    const navigate = useNavigate();

    const AxiosInstance = axios.create({
        baseURL: API_BASE_URL
    });

    AxiosInstance.interceptors.request.use(
        (config) => {
            let token = localStorage.getItem('auth');

            if (token) {
                // Removing double quotes from token if present
                token = token.replace(/^"|"$/g, '');
                config.headers.Authorization = `Bearer ${token}`;
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
                //localStorage.removeItem('user');
                navigate('/login');
                toast.info(SESSION_EXPIRE);
            }
            return Promise.reject(error);
        }
    );

    return AxiosInstance;
};

export default useAxiosInstance;
