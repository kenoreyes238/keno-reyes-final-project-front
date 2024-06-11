import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AddProducts from "../components/AddProducts";
import Products from "../components/Products";
import apiService from "../services/ApiServices";

export default function Main() {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const data = await apiService.fetchProducts();
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
