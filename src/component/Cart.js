import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosInstance from '../api/AxiosInstance';
import { API_CART } from '../constants/ApiConstants';
import useCartService from '../services/cartServices';
import useOrderService from '../services/orderServices';
import { useSelector } from 'react-redux';

export const Cart = () => {
    const params = useParams();
    const AxiosInstance = useAxiosInstance();
    const [cartValues, setCartValues] = useState(null);
    const user = useSelector(state => state.user);
    const CartService = useCartService();
    const [isLoading, setIsLoading] = useState(false);
    const OrderService = useOrderService();

    useEffect(() => {
        getCart();
    }, []);

    const getCart = async () => {
        try {
            const results = await AxiosInstance.get(`${API_CART}/${params.id}`);
            setCartValues(results.data);
        } catch (error) {
            console.error("Error Fetching Cart Data:", error);
        }
    };

    // Increase quantity of an item
    const increaseQuantity = async (productId) => {
        await CartService.updateProductToCart(productId, user._id, 1);
        await getCart();
    };

    // Decrease quantity of an item
    const decreaseQuantity = async (productId) => {
        await CartService.updateProductToCart(productId, user._id, -1);
        await getCart();
    };

    // Remove an item from the cart
    const removeItem = async (itemId) => {
        setIsLoading(true);
        await CartService.removeItemfromCart(itemId, user._id);
        await getCart();
        await setIsLoading(false);
    };

    // Decrease quantity of an item
    const createOrder = async (userId, totalAmount) => {
        setIsLoading(true);
        const result = await OrderService.createOrder(userId, totalAmount);
        //emptying cart after order
        if (result)
            setCartValues(null);
        await setIsLoading(false);
    };

    // Calculate total price
    const calculateTotal = cartValues && cartValues.items
        ? cartValues.items.reduce((total, item) => {
            return total + item.quantity * parseInt(item.productId.price);
        }, 0)
        : 0;


    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Shopping Cart</h2>

            {cartValues && cartValues.items && cartValues.items.length > 0 ? (
                <>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartValues.items.map((item) => {
                                const { productId, quantity } = item;
                                return (
                                    <tr key={item._id}>
                                        <td>{productId.name}</td>
                                        <td>INR {productId.price}</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <button
                                                    className="btn btn-sm btn-outline-primary me-2"
                                                    onClick={() => decreaseQuantity(item.productId._id)}
                                                >
                                                    -
                                                </button>
                                                <span>{quantity}</span>
                                                <button
                                                    className="btn btn-sm btn-outline-primary ms-2"
                                                    onClick={() => increaseQuantity(item.productId._id)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td>INR {(productId.price * item.quantity).toFixed(2)}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => removeItem(item._id)}
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <span
                                                            className="spinner-border spinner-border-sm"
                                                            role="status"
                                                            aria-hidden="true"
                                                        ></span>{' '}
                                                        Removing...
                                                    </>
                                                ) : (
                                                    'Remove'
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-between align-items-center">
                        <h4>Total Price: INR {calculateTotal}</h4>
                        <button
                            className="btn btn-success"
                            onClick={() => createOrder(user._id, calculateTotal)}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>{' '}
                                    Processing...
                                </>
                            ) : (
                                'Purchase'
                            )}
                        </button>
                    </div>
                </>

            ) : (
                <div className="alert alert-info text-center">
                    Your cart is empty. Start adding some products!
                </div>
            )}
        </div>
    );
};
