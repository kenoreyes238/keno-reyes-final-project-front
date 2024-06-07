import { useState } from "react"
import { useNavigate } from "react-router-dom";
import apiService from "../services/ApiServices";

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
    
      try {
        const { success } = await apiService.login(email, password);
        if(success) {
          navigate("/main");
        } else {
          alert ('Error logging in');
        }
        
      } catch(err) {
        console.error('Error during login', err);
      }
    }
    
    return (
      <div className="containerLogin">
        <h1>MyInventory</h1>
        <div className="loginBlock">
          <h2 className="center">Sign in</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <h4>Don&apos;t have an account with us?</h4>
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
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </label>
              <label>
                Password
                <input 
                  className="textField" 
                  type="password" 
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
    );
  }
  