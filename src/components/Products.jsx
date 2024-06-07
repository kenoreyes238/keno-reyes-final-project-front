import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useState } from "react";

export default function Products({ products, fetchProducts }) {
    const [editProduct, setEditProduct] = useState(null);
    const [editedProduct, setEditedProduct] = useState({});

    const handleDeleteProduct = async (productId) => {
        try {
            const response = await fetch(`http://localhost:3001/deleteProduct/${productId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (data.success) {
                fetchProducts();
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    const handleEditClick = (product) => {
        setEditProduct(product.id);
        setEditedProduct({ ...product });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSaveChanges = async () => {
        try {
            const response = await fetch(`http://localhost:3001/editProduct/${editProduct}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: editedProduct.name,
                    price: editedProduct.price,
                    quantity: editedProduct.quantity,
                    amount: editedProduct.price * editedProduct.quantity
                })
            });
            const data = await response.json();
            if (data.success) {
                fetchProducts();
                setEditProduct(null);
            }
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    }

    const handleCancelEdit = () => {
        setEditProduct(null);
        setEditedProduct({});
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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((row) => (
                        <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>
                                {editProduct === row.id ? (
                                    <input 
                                        type="text" 
                                        name="name" 
                                        value={editedProduct.name || ''} 
                                        onChange={handleInputChange} 
                                    />
                                ) : (
                                    row.name
                                )}
                            </td>
                            <td>
                                {editProduct === row.id ? (
                                    <input 
                                        type="text" 
                                        name="price" 
                                        value={editedProduct.price || ''} 
                                        onChange={handleInputChange} 
                                    />
                                ) : (
                                    row.price
                                )}
                            </td>
                            <td>
                                {editProduct === row.id ? (
                                    <input 
                                        type="number" 
                                        name="quantity" 
                                        value={editedProduct.quantity || ''} 
                                        onChange={handleInputChange} 
                                    />
                                ) : (
                                    row.quantity
                                )}
                            </td>
                            <td>
                                {editProduct === row.id ? (
                                    editedProduct.price * editedProduct.quantity
                                ) : (
                                    row.amount
                                )}
                            </td>
                            <td>
                                {editProduct === row.id ? (
                                    <>
                                        <Button variant="primary" onClick={handleSaveChanges}>
                                            Save
                                        </Button>
                                        <Button variant="secondary" onClick={handleCancelEdit}>
                                            Cancel
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button variant="primary" onClick={() => handleEditClick(row)} className="productBtns">
                                            Edit
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDeleteProduct(row.id)} className="productBtns">
                                            Delete
                                        </Button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}