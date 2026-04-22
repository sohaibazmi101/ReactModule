import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext"

import "../styles/navbar.css";

function Navbar() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <nav className={`navbar ${theme}`}>
            <h2 className="logo">IntelliHub</h2>

            <div className="nav-links">

                <Link to="/">Home</Link>
                <Link to="/todo">ToDo</Link>
                <Link to="/register">Register</Link>
                <Link to="/products">Products</Link>

            </div>

            <button onClick={toggleTheme} className="theme-btn">
                {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
        </nav>
    );
}
export default Navbar;