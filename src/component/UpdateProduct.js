import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useAxiosInstance from '../api/AxiosInstance';
import { toast } from 'react-toastify';

const UpdateProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    const navigate = useNavigate();
    const params = useParams();
    const AxiosInstance = useAxiosInstance();

    useEffect(() => {
        getProductDetails();
    }, [])

    const getProductDetails = async () => {
        try {
            let result = await AxiosInstance.get(`/api/product/${params.id}`);
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
        try {
            let result = await AxiosInstance.put(`/api/product/${params.id}`, { name, price, category, company });
            if (result) {
                toast.success('Product Updated Successfully!');
                console.warn(result);
                navigate('/');
            }
        } catch (error) {
            console.error('Error Fetching data ' + error);
            toast.error('Failed to update the Product. Please try again.');
        }
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
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter Product Name"
                                    />
                                </div>

                                {/* Product Price */}
                                <div className="mb-3">
                                    <label className="form-label">Price</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="Enter Price"
                                    />
                                </div>

                                {/* Product Category */}
                                <div className="mb-3">
                                    <label className="form-label">Category</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        placeholder="Enter Category"
                                    />
                                </div>

                                {/* Product Company */}
                                <div className="mb-3">
                                    <label className="form-label">Company</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        placeholder="Enter Company"
                                    />
                                </div>

                                {/* Update Button */}
                                <div className="d-grid">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={updateData}
                                    >
                                        Update Product
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