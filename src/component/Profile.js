import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

export const Profile = () => {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-header text-center bg-primary text-white">
                    <h3>My Profile</h3>
                </div>
                <div className="card-body">
                    <p className="mb-2">
                        <strong>Name:</strong> {user.name}
                    </p>
                    <p className="mb-4">
                        <strong>Email:</strong> {user.email}
                    </p>
                    <div className="d-flex justify-content-between">
                        <button
                            className="btn btn-outline-primary"
                            onClick={() => alert("View Orders")}
                        >
                            My Orders
                        </button>
                        <button
                            className="btn btn-outline-success"
                            onClick={() => navigate(`/cart/${user._id}`)}
                        >
                            My Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
