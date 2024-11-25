import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useAxiosInstance from '../api/AxiosInstance';
import { toast } from 'react-toastify';
import { API_PRODUCTS } from '../constants/ApiConstants';
import { VALIDATION_ERRORS } from '../constants/MessageConstants';

const UpdateProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false);;
    const navigate = useNavigate();
    const params = useParams();
    const AxiosInstance = useAxiosInstance();

    useEffect(() => {
        getProductDetails();
    }, [])

    const getProductDetails = async () => {
        try {
            let result = await AxiosInstance.get(`${API_PRODUCTS}/${params.id}`);
            setName(result.data.name);
            setPrice(result.data.price);
            setCategory(result.data.category);
            setCompany(result.data.company);
        }
        catch (error) {
            console.error('Error Fetching data ' + error);
        }
    }

    const updateData = async () => {
        console.warn(name, price, category, company);
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }

        setIsLoading(true);
        try {
            let result = await AxiosInstance.put(`${API_PRODUCTS}/${params.id}`, { name, price, category, company });
            if (result) {
                toast.success('Product Updated Successfully!');
                console.warn(result);
                navigate('/');
            }
        } catch (error) {
            console.error('Error Fetching data ' + error);
            toast.error('Failed to update the Product. Please try again.');
        }
        setIsLoading(false);
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            <h4 className="text-center">Update Product</h4>
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
                                    {error && !company && <div className="invalid-feedback">Company {VALIDATION_ERRORS.REQUIRED}</div>}
                                </div>

                                {/* Update Button */}
                                <div className="d-grid">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={updateData}
                                    >
                                        {isLoading ? (
                                            <>
                                                <span
                                                    className="spinner-border spinner-border-sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                ></span>{' '}
                                                Updating...
                                            </>
                                        ) : (
                                            'Update'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateProduct;