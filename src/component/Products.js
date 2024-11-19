import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AxiosInstance from '../api/AxiosInstance';
import 'bootstrap/dist/css/bootstrap.min.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        try {
            let results = await AxiosInstance.get('/getProducts');
            console.warn('results from getProducts ' + results)

            setProducts(results.data);
        } catch (error) {
            console.error('Error Fetching data ' + error);
        }
    }

    const deleteProduct = async (id) => {
        console.warn('Product id ', id);
        //` is used for string interpolation to make id take the parameter value
        try {
            await AxiosInstance.delete(`/product/${id}`);
            alert('Record Deleted');
            getProducts();
        } catch (error) {
            console.error('Error Fetching data ' + error);
        }
    }

    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            try {
                let results = await AxiosInstance.get(`/search/${key}`);
                if (results.data) {
                    setProducts(results.data);
                }
            } catch (error) {
                console.error('Error Fetching data ' + error);
            }
        } else {
            getProducts();
        }
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Products</h1>

            {/* Search Bar */}
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search Product"
                    onChange={searchHandle}
                />
            </div>

            {/* Products Table */}
            {products.length > 0 ? (
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">S. No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Category</th>
                            <th scope="col">Company</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item, index) => (
                            <tr key={item._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.price} INR</td>
                                <td>{item.category}</td>
                                <td>{item.company}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm me-2"
                                        onClick={() => deleteProduct(item._id)}
                                    >
                                        Delete
                                    </button>
                                    <Link
                                        to={'/update/' + item._id}
                                        className="btn btn-primary btn-sm"
                                    >
                                        Update
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <h3 className="text-center">No Products Found</h3>
            )}
        </div>
    );
}
export default Products;