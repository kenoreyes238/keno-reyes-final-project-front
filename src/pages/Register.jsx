import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:3002/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
            if (response.ok) {
                const data = await response.json();
                navigate("/login");
                console.log(data);
            } else {
                const errorData = await response.json();
                console.error('Registration failed:', errorData);
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    }


    return (
        <div className="containerLogin">
            <h1>MyInventory</h1>
            <div className="loginBlock">
                <h1 className="center">Register your account</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h4>Already have an account?</h4>
                        <p className="registerLink" onClick={() => navigate("/login")}>
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