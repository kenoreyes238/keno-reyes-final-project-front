import { useState } from "react";
import { Table, Button } from "react-bootstrap";

export default function AddProducts() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [sum, setSum] = useState("");
    const [total, setTotal] = useState("");

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleQty = (e) => {
        const newQty = parseInt(e.target.value);
        if(!isNaN(newQty)) {
            setQuantity(newQty);
            handleAdd(price, newQty);
        }
    }

    const handleAdd = (price, quantity) => {
        const newTotal = price * quantity;
        setTotal(newTotal);
    }

    const handlePrice = (e) => {
        setPrice(e.target.value);
        handleAdd(e.target.value, quantity);
    }

    const handleAddProduct = async () => {
        try {
            const response = await fetch('http://localhost:3002/addProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    price,
                    quantity
                })
            });
            const data = await response.json();
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
                                placeholder="product name"
                                value={name}
                                onChange={handleName}
                            />
                        </td>
                        <td>
                            <input 
                                type="text"
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
                            />
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Button onSubmit={handleAddProduct} variant="primary">
                Add Product
            </Button>
        </div>
    )
}