import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AddProducts from "../components/AddProducts";
import Products from "../components/Products";

export default function Main() {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:3001/products', {
                method: 'GET',
                credentials: 'include' // Include credentials to send cookies
            });
            if (!response.ok) {
                throw new Error('Network response not ok');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <div className="containerWrap">
                <Navbar />
                <AddProducts onProductAdded={fetchProducts} />
                <Products products={products} fetchProducts={fetchProducts} />
            </div>
        </div>
    );
}
