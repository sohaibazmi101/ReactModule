import { useEffect, useState } from "react";
import axios from "axios";
import { data } from "react-router-dom";

function Products() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                setIsLoading(true);
                setError(null);
                const res = await axios.get("https://fakestoreapi.com/products");
                setProducts(res.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchProducts();
    }, []);

    if (error) {
        return (
            <div className="product-list">
                <h2 style={{ color: "red" }}>Error: {error}</h2>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="pruduct-list">
                <h1>Loading....</h1>
            </div>
        )
    }
    return (
        <div className="product-list">
            {
                products.map((product) => (
                    <div key={product.id}>
                        <div className="product-cards">
                            <h3>{product.title}</h3>
                            <img src={product.image} alt="Product Image" />
                            <p>₹{product.price}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Products;