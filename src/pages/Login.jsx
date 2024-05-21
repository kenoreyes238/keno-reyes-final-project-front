import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!email || !password) {
            alert("Please fill out login information");
            return;
        }
    
        const response = await fetch("http://localhost:3001/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
    
        if (!response.ok)
            throw new Error("Sign in request failed", response);
    
        const data = await response.json();
        console.log("User logged in successfully:", data); // Add this console log
    
        navigate("/");

        return data;
    }
    

    return (
        <div className="containerLogin">
            <h1>MyInventory</h1>
            <div className="loginBlock">
                <h1 className="center">Sign in</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h4>Don't have an account with us?</h4>
                        <p className="registerLink" onClick={() => navigate("/register")}>
                            Register Here
                        </p>
                    </div>
                    <div className="inputFields">
                        <label>
                            Email 
                            <input 
                                className="textField" 
                                type="email" 
                                placeholder="email" 
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            Password
                            <input 
                                className="textField" 
                                type="password" 
                                placeholder="password" 
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <button className="loginBtn" type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}