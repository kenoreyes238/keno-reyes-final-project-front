import { useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import apiService from "../services/ApiServices";

export default function AddProducts({ onProductAdded }) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [amount, setAmount] = useState(0);

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleQty = (e) => {
        const newQty = parseInt(e.target.value, 10);
        if (!isNaN(newQty)) {
            setQuantity(newQty);
            setAmount(newQty * price);
        }
    }

    const handlePrice = (e) => {
        const newPrice = parseFloat(e.target.value);
        if (!isNaN(newPrice)) {
            setPrice(newPrice);
            setAmount(newPrice * quantity);
        }
    }

    const handleAddProduct = async () => {
        try {
            const data = await apiService.addProduct(name, price, quantity, amount);
            if (data.success) {
                console.log("Product added successfully!");
                setName("");
                setPrice("");
                setQuantity("");
                setAmount(0);
                onProductAdded();
            } else {
                console.error("Failed to add product:", data.message);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    }

    return (
        <div className="addProducts">
            <Table striped bordered hover size="md">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input 
                                type="text"
                                placeholder="Product name"
                                value={name}
                                onChange={handleName}
                            />
                        </td>
                        <td>
                            <input 
                                type="number"
                                placeholder="$0"
                                value={price}
                                onChange={handlePrice}
                            />
                        </td>
                        <td>
                            <input 
                                type="number"
                                placeholder="0"
                                value={quantity}
                                onChange={handleQty}
                            />
                        </td>
                        <td>
                            <input 
                                type="number"
                                placeholder="0"
                                value={amount}
                                readOnly
                            />
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Button className="addBtn" onClick={handleAddProduct} variant="success">
                Add Product
            </Button>
        </div>
    )
}
