import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from '../api/AxiosInstance';
import Products from './Products';

const AddProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    const navigate = useNavigate();

    const addData = async () => {
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }

        try {
            let result = await AxiosInstance.post('/addProduct', { name, price, category, company, userId });
            console.warn(result);

            if (result) {
                alert('Product Added Successfully');
                navigate('/');
            }
        } catch (error) {
            console.error('Error Fetching data ' + error);

        }
    }

    return (
        < div className="register">
            <h1>Add Product</h1>

            <div >
                <input className="inputBox" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Product Name" />
                {error && !name && <span className='invalidInput'>Name cannot be empty</span>}

                <input className="inputBox" value={price} onChange={(e) => setPrice(e.target.value)} type="text" placeholder="Enter Price" />
                {error && !price && <span className='invalidInput'>Price cannot be empty</span>}

                <input className="inputBox" value={category} onChange={(e) => setCategory(e.target.value)} type="text" placeholder="Enter Category" />
                {error && !category && <span className='invalidInput'>Category cannot be empty</span>}

                <input className="inputBox" value={company} onChange={(e) => setCompany(e.target.value)} type="text" placeholder="Enter Company" />
                {error && !company && <span className='invalidInput'>Company Name cannot be empty</span>}

                <button className="appButton" onClick={addData} type="button">Add Product</button>

            </div>
        </div >

    )
}

export default AddProduct;