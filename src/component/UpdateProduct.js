import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    const navigate = useNavigate();

    const updateData = async () => {
        console.warn(name, price, category, company);
    }

    return (
        < div className="register">
            <h1>Update Product</h1>

            <div >
                <input className="inputBox" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Product Name" />

                <input className="inputBox" value={price} onChange={(e) => setPrice(e.target.value)} type="text" placeholder="Enter Price" />

                <input className="inputBox" value={category} onChange={(e) => setCategory(e.target.value)} type="text" placeholder="Enter Category" />

                <input className="inputBox" value={company} onChange={(e) => setCompany(e.target.value)} type="text" placeholder="Enter Company" />

                <button className="appButton" onClick={updateData} type="button">Update Product</button>

            </div>
        </div >

    )
}

export default UpdateProduct;