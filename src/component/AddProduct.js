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
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-header bg-success text-white">
                            <h4 className="text-center">Add Product</h4>
                        </div>
                        <div className="card-body">
                            <form>
                                {/* Product Name */}
                                <div className="mb-3">
                                    <label className="form-label">Product Name</label>
                                    <input
                                        type="text"
                                        className={`form-control ${error && !name ? "is-invalid" : ""}`}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter Product Name"
                                    />
                                    {error && !name && <div className="invalid-feedback">Name cannot be empty</div>}
                                </div>

                                {/* Product Price */}
                                <div className="mb-3">
                                    <label className="form-label">Price</label>
                                    <input
                                        type="text"
                                        className={`form-control ${error && !price ? "is-invalid" : ""}`}
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="Enter Price"
                                    />
                                    {error && !price && <div className="invalid-feedback">Price cannot be empty</div>}
                                </div>

                                {/* Product Category */}
                                <div className="mb-3">
                                    <label className="form-label">Category</label>
                                    <input
                                        type="text"
                                        className={`form-control ${error && !category ? "is-invalid" : ""}`}
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        placeholder="Enter Category"
                                    />
                                    {error && !category && <div className="invalid-feedback">Category cannot be empty</div>}
                                </div>

                                {/* Product Company */}
                                <div className="mb-3">
                                    <label className="form-label">Company</label>
                                    <input
                                        type="text"
                                        className={`form-control ${error && !company ? "is-invalid" : ""}`}
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        placeholder="Enter Company"
                                    />
                                    {error && !company && <div className="invalid-feedback">Company Name cannot be empty</div>}
                                </div>

                                {/* Submit Button */}
                                <div className="d-grid">
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={addData}
                                    >
                                        Add Product
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddProduct;