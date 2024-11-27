import { API_ORDER } from '../constants/ApiConstants';
import { toast } from 'react-toastify';
import useAxiosInstance from '../api/AxiosInstance';

const useOrderService = () => {
    const AxiosInstance = useAxiosInstance();

    const createOrder = async (userId, totalAmount) => {
        try {
            const payload = { userId, totalAmount };
            let result = await AxiosInstance.post(`${API_ORDER}`, payload);
            if (result) {
                toast.success('Order Created Successfully!');
                return true;
            }
        } catch (error) {
            console.error('Error Fetching data ' + error);
            toast.error('Failed to Create Order. Please try again');
            return false;
        }
    }

    return { createOrder };
}

export default useOrderService;