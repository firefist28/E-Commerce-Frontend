import axios from 'axios';

const AxiosInstance = axios.create({
	baseURL: 'http://localhost:5000',
});

AxiosInstance.interceptors.request.use(
	(config) => {
		let token = localStorage.getItem('auth');

		if (token) {
			//removing double quotes from token if present
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

export default AxiosInstance;