import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AxiosInstance from '../api/AxiosInstance';

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
        <div className="productList">
            <h1>Products</h1>
            <input type="text" placeholder="Search Product" className="searchProductBox" onChange={searchHandle} />

            <ul>
                <li>S. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            {
                products.length > 0 ?
                    products.map((item, index) =>
                        <ul key={item._id}>
                            <li>{index + 1}</li>
                            <li>{item.name}</li>
                            <li>{item.price} INR</li>
                            <li>{item.category}</li>
                            <li>{item.company}</li>
                            <li><button onClick={() => deleteProduct(item._id)}>Delete</button>
                                <Link to={'/update/' + item._id}>Update</Link>
                            </li>
                        </ul>
                    )
                    : <h1>No Products</h1>
            }
        </div>
    )
}
export default Products;