import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let results = await fetch('http://localhost:5000/getProducts');
        results = await results.json();

        setProducts(results);
        console.warn("products ", products);
    }

    const deleteProduct = async (id) => {
        console.warn('Product id ', id);
        //` is used for string interpolation to make id take the parameter value
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: 'delete'
        });

        result = await result.json();
        if (result) {
            alert('Record Deleted');

            // After deletion, update the product list (optional)
            getProducts();
        }
    }

    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let results = await fetch(`http://localhost:5000/search/${key}`);
            results = await results.json();
            if (results) {
                setProducts(results);
            } else {

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