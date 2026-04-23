import { useEffect, useState } from "react";
import "../styles/register.css";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Register() {
    const { register, login, loading, error } = useAuthContext();
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (formData.email === "" || formData.password === "") {
            alert("Empty Feild");
            return;
        }
        if (!isLogin && formData.password !== formData.confirmPassword) {
            alert("password Do not match");
            return;
        }
        try {
            let res;
            if (isLogin) {
                res = await login({
                    email: formData.email,
                    password: formData.password,
                });
                alert("Login Success");
                navigate("/");
            } else {
                res = await register({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                });
                alert("Register Success");
                setIsLogin(true);
            }
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="register">
            <h1 className="heading">
                {isLogin ? "Login" : "Register"} on ItelliHub
            </h1>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                )}
                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {!isLogin && (
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                )}
                <button type="submit">
                    {loading
                        ? "Processing..."
                        : isLogin
                            ? "Login"
                            : "Register"}
                </button>
                {error && <p className="register-error">{error}</p>}
            </form>
            <p className="check-changer">
                {isLogin ? "Don't have an account?" : "Already have an account?"}

                <span
                    style={{ cursor: "pointer", marginLeft: "5px" }}
                    onClick={() => setIsLogin(!isLogin)}
                    className="changer"
                >
                    {isLogin ? "Register" : "Login"}
                </span>
            </p>
        </div>
    )
}

export default Register;