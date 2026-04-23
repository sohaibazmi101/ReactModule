import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext"
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import "../styles/navbar.css";

function Navbar() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { user, logout} = useAuthContext();

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/register");
    }

    return (
        <nav className={`navbar ${theme}`}>
            <h2 className="logo">IntelliHub</h2>

            {user ? (
                <span className="user-name">Hi, {user.name}</span>
            ):(
                <>
                </>
            )}

            <div className="nav-links">

                <button onClick={toggleTheme} className="theme-btn">
                    {theme === "light" ? "Dark Mode" : "Light Mode"}
                </button>

                <Link to="/">Home</Link>
                <Link to="/todo">ToDo</Link>
                <Link to="/products">Products</Link>
                <Link to="/text-generator">Generate Text</Link>
                {user ? (
                    <>
                    <button onClick={handleLogout} className="login-link">
                        Logout
                    </button>
                    </>
                ):(
                    <Link to="/register" className="login-link">Login</Link>
                )}

            </div>
        </nav>
    );
}
export default Navbar;