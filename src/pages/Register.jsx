import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import apiService from "../services/ApiServices";

export default function Register() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const { jwt, success } = await apiService.register(values.email, values.password);
            if(success) {
               localStorage.setItem('inventory-app-jwt', jwt); 
            } else {
                alert('Error registering account');
            }
            
            navigate("/");
            // console.log(data);
        } catch (error) {
            console.error('Error during registration:', error);
        }
    }

    return (
        <div className="containerRegister">
            <h1>MyInventory</h1>
            <div className="registerBlock">
                <h2>Register your account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="linkToLogin">
                        <p>Already have an account?&nbsp;</p>
                        <p className="registerLink" onClick={() => navigate("/")}>
                            Sign in here
                        </p>
                    </div>
                    <div className="inputFields">
                        <label>
                            <FloatingLabel
                                label="Email"
                                className="mb-3"
                            >
                                <Form.Control 
                                    type="email" 
                                    placeholder="name@example.com" 
                                    className="textField" 
                                    onChange={e => setValues(e.target.value)}
                                    required
                                />
                            </FloatingLabel>
                            </label>
                        <label>
                            <FloatingLabel
                                label="Password"
                                className="mb-3"
                            >
                                <Form.Control 
                                    type="password"  
                                    className="textField" 
                                    placeholder="password" 
                                    onChange={e => setValues(e.target.value)}
                                    required
                                />
                            </FloatingLabel>
                        </label>
                        <label>
                        <FloatingLabel
                            label="Verify Password"
                            className="mb-3"
                        >
                            <Form.Control 
                                type="password"  
                                className="textField" 
                                placeholder="password" 
                                onChange={e => setValues(e.target.value)}
                                required
                            />
                        </FloatingLabel>
                        </label>
                    </div>
                    <Button className="loginBtn" type="submit">
                        Sign Up
                    </Button>
                </form>
            </div>
        </div>
    )
}