import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Pagination } from 'react-bootstrap';
import { toast } from 'react-toastify';
import useAxiosInstance from '../api/AxiosInstance';
import { API_PRODUCTS } from '../constants/ApiConstants';
import { useSelector } from 'react-redux';
import { roles } from '../constants/enums';

const Products = () => {
    const AxiosInstance = useAxiosInstance();

    const [currentPage, setCurrentPage] = useState(1); // Current page
    const [totalPages, setTotalPages] = useState(1); // Total pages
    const [productsPerPage] = useState(5); // Products per page

    const [products, setProducts] = useState([]);
    const { user } = useSelector((state) => state);

    useEffect(() => {
        getProducts(currentPage);
    }, [currentPage])

    const getProducts = async (page) => {
        try {
            let results = await AxiosInstance.get(`${API_PRODUCTS}?page=${page}&limit=${productsPerPage}`);
            console.warn('results from getProducts ' + results.data.data)

            setProducts(results.data.data);
            setTotalPages(results.data.totalPages);
        } catch (error) {
            console.error('Error Fetching data ' + error);
        }
    }

    const deleteProduct = async (id) => {
        console.warn('Product id ', id);
        //` is used for string interpolation to make id take the parameter value
        try {
            await AxiosInstance.delete(`${API_PRODUCTS}/${id}`);
            toast.success('Product Deleted!');
            getProducts(currentPage);
        } catch (error) {
            console.error('Error Fetching data ' + error);
            toast.error('Failed to delete Product. Please try again');
        }
    }

    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            try {
                let results = await AxiosInstance.get(`${API_PRODUCTS}/search/${key}`);
                if (results.data) {
                    setProducts(results.data);
                    setTotalPages(1); // Reset pagination during search
                }
            } catch (error) {
                console.error('Error Fetching data ' + error);
            }
        } else {
            getProducts(currentPage);
        }
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

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
                                <th scope="row">{(currentPage - 1) * productsPerPage + index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.price} INR</td>
                                <td>{item.category}</td>
                                <td>{item.company}</td>
                                {user.role === roles.ADMIN ? (
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
                                ) : (
                                    <button
                                        className="btn btn-primary btn-sm"
                                    >
                                        Add to Cart
                                    </button>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <h3 className="text-center">No Products Found</h3>
            )}

            {/* Pagination */}
            <Pagination className="justify-content-center mt-4">
                <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                />
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                        key={index}
                        active={index + 1 === currentPage}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />
            </Pagination>
        </div>
    );
}
export default Products;