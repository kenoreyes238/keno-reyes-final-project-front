import { useState } from "react"
import { useNavigate } from "react-router-dom";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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
        const { jwt, success } = await apiService.login(email, password);
        if(success) {
          localStorage.setItem('jwtToken', jwt);
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
          <h2>Sign in</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <p>Don&apos;t have an account with us?</p>
              <p className="registerLink" onClick={() => navigate("/register")}>
                Register Here
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
                    onChange={e => setEmail(e.target.value)}
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
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </FloatingLabel>
              </label>
            </div>
            <Button className="loginBtn" type="submit">
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }
  