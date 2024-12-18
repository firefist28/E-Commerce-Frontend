import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAxiosInstance from '../api/AxiosInstance';
import { API_PRODUCTS } from '../constants/ApiConstants';
import { VALIDATION_ERRORS } from '../constants/MessageConstants';

const AddProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const AxiosInstance = useAxiosInstance();
    const [isLoading, setIsLoading] = useState(false);

    const addData = async () => {
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }

        try {
            setIsLoading(true);
            let result = await AxiosInstance.post(API_PRODUCTS, { name, price, category, company });
            console.warn(result);

            if (result) {
                toast.success('Product Added Successfully!');
                navigate('/');
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error Fetching data ' + error);
            toast.error('Failed to add the Product. Please try again.');
            setIsLoading(false);
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
                                    {error && !name && <div className="invalid-feedback">Name {VALIDATION_ERRORS.REQUIRED}</div>}
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
                                    {error && !price && <div className="invalid-feedback">Price {VALIDATION_ERRORS.REQUIRED}</div>}
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
                                    {error && !category && <div className="invalid-feedback">Category {VALIDATION_ERRORS.REQUIRED}</div>}
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
                                    {error && !company && <div className="invalid-feedback">Company Name {VALIDATION_ERRORS.REQUIRED}</div>}
                                </div>

                                {/* Submit Button */}
                                <div className="d-grid">
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={addData}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <span
                                                    className="spinner-border spinner-border-sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                ></span>{' '}
                                                Adding...
                                            </>
                                        ) : (
                                            'Add'
                                        )}
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