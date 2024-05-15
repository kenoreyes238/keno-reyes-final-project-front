import Navbar from "../components/Navbar"
import AddProducts from "../components/AddProducts"
import Products from "../components/Products"
// import "bootstrap/dist/css/bootstrap.min.css";

export default function Main() {
    return (
        <div>
            <div className="containerWrap">
                <Navbar />
                <AddProducts />
                <Products />
            </div>
        </div>
    )
}