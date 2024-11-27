import React, { useEffect, useState } from 'react';
import useAxiosInstance from '../api/AxiosInstance';
import { useSelector } from 'react-redux';
import { API_ORDER } from '../constants/ApiConstants';

export const Order = ({ userId }) => {
    const [orders, setOrders] = useState([]);
    const AxiosInstance = useAxiosInstance();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = useSelector(state => state.user);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await AxiosInstance.get(`${API_ORDER}/${user._id}`);
                setOrders(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load orders');
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userId]);

    if (loading) return <div className="text-center my-5">Loading orders...</div>;
    if (error) return <div className="alert alert-danger my-5">{error}</div>;

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Your Orders</h1>
            {orders && orders.length > 0 ? (
                orders.map((order) => (
                    <div key={order._id} className="card mb-3">
                        <div className="card-header">
                            <h5>Order ID: {order._id}</h5>
                        </div>
                        <div className="card-body">
                            <p>
                                <strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
                            </p>
                            <p>
                                <strong>Total Amount:</strong> ${order.totalAmount}
                            </p>
                            <h6>Items:</h6>
                            <ul className="list-group list-group-flush">
                                {order.items.map((item, index) => (
                                    <li key={index} className="list-group-item">
                                        {item.productId.name} - Quantity: {item.quantity}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))
            ) : (
                <div className="alert alert-info text-center">You have no orders.</div>
            )}
        </div>
    );
};
