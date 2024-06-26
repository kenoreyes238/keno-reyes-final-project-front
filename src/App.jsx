import Login from "./pages/Login.jsx"
import Register from './pages/Register.jsx';
import Main from "./pages/Main.jsx"
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

function App() {

  return (
    <Router> 
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/main" element={<Main />} />
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </header>
      </div>
    </Router>
  )
}

export default App
