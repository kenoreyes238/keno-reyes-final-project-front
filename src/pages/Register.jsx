import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
                <h1>Register your account</h1>
                <form onSubmit={handleSubmit}>
                    <div className="linkToLogin">
                        <p>Already have an account?&nbsp;</p>
                        <p className="registerLink" onClick={() => navigate("/")}>
                            Sign in here
                        </p>
                    </div>
                    <div className="inputFields">
                        <label>
                            Email 
                            <input 
                                className="textField" 
                                type="email" 
                                placeholder="email"
                                onChange={e => setValues({...values, email: e.target.value})}
                                required
                            />
                        </label>
                        <label>
                            Password
                            <input 
                                className="textField" 
                                type="password" 
                                placeholder="password"
                                onChange={e => setValues({...values, password: e.target.value})}
                                required
                            />
                        </label>
                        <label>
                            Verify Password
                            <input 
                                className="textField" 
                                type="password" 
                                placeholder="password" 
                                required
                            />
                        </label>
                    </div>
                    <button className="loginBtn" type="submit">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    )
}