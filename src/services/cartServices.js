import { API_CART } from '../constants/ApiConstants';
import { toast } from 'react-toastify';
import useAxiosInstance from '../api/AxiosInstance';

const useCartService = () => {
    const AxiosInstance = useAxiosInstance();

    const addProductToCart = async (productId, userId) => {
        try {
            const quantity = 1;
            const payload = { userId, productId, quantity };
            let result = await AxiosInstance.post(`${API_CART}`, payload);
            if (result) {
                toast.success('Product Added Successfully!');
            }
        } catch (error) {
            console.error('Error Fetching data ' + error);
            toast.error('Failed to Add  to Cart. Please try again');
        }
    }

    const updateProductToCart = async (productId, userId, quantity) => {
        try {
            quantity = parseInt(quantity, 10);
            const payload = { userId, productId, quantity };
            let result = await AxiosInstance.post(`${API_CART}`, payload);
            if (result) {
                toast.success('Product Updated Successfully!');
            }
        } catch (error) {
            console.error('Error Fetching data ' + error);
            toast.error('Failed to Update Cart. Please try again');
        }
    }

    return { addProductToCart, updateProductToCart };
}

export default useCartService;