import { useState, useEffect } from "react"
import { Button, Table } from "react-bootstrap";

export default function Products() {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await fetch('/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    const handleDeleteProduct = async (productId) => {
        try {
            const response = await fetch(`/deleteProduct/${productId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            // Handle response as needed
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    return (
        <div className="products">
            <h3>Products</h3>
            <Table striped bordered hover size="md">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Amount</th> 
                    </tr>
                </thead>
                <tbody>
                    
                    {products.map((row, index) => {
                        <tr key={index}>
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td>{row.price}</td>
                            <td>{row.quantity}</td>
                            <td>{row.amount}</td>
                        </tr>
                    })}
                </tbody>
                <Button variant="primary" className="productBtns">
                                Edit
                            </Button>
                            <Button variant="danger" className="productBtns" onClick={() => handleDeleteProduct(products.id)}>
                                Delete
                            </Button>
            </Table>
        </div>
    )
}