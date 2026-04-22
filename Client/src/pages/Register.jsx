import { useEffect, useState } from "react";
import "../styles/register.css";

function Register() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.length > 0) {
            setCurrentUser(users[0]);
            setIsLoggedIn(true);
        }
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (formData.name === "" || formData.email === "") {
            alert("Empty Feild");
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            alert("password Do not match");
            return;
        }
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        const newUser = {
            name: formData.name,
            email: formData.email,
            password: formData.password
        };

        setCurrentUser(newUser);
        setIsLoggedIn(true);

        localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));

        console.log("Saved User: ", [...existingUsers, newUser]);
        alert("Register Successfull");
    }

    function handleEdit() {
        if (!currentUser) return;
        setFormData({
            name: currentUser.name,
            email: currentUser.email,
            password: currentUser.password,
            confirmPassword: currentUser.confirmPassword
        });
        setIsEditMode(true);
    }

    function cancelEditMode() {
        setIsEditMode(false);
    }

    function handleEditMode(e) {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Password Do not Match");
            return;
        }
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = users.map((user) =>
            user.email === currentUser.email
                ? {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                }
                : user
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        const updatedUser = {
            name: formData.name,
            email: formData.email,
            password: formData.password
        };
        setCurrentUser(updatedUser);
        setIsEditMode(false);
        alert("Updated Successfully");
    }

    if (isEditMode) {
        return (
            <div className="register">
                <h1>Edit Your Credentials</h1>
                <form onSubmit={handleEditMode}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    <button type="submit">Update</button>
                    <button onClick={cancelEditMode}>Cancel</button>
                </form>
            </div>
        )
    }
    if (isLoggedIn) {
        return (
            <div className="register">
                <h1>Welcome {currentUser.name}</h1>
                <p>You are already logged in</p>
                <p>Your Email id: {currentUser.email}</p>

                <button
                    onClick={() => {
                        localStorage.removeItem("users");
                        setIsLoggedIn(false);
                        setCurrentUser(null);
                    }}
                >
                    Logout
                </button>
                <button onClick={handleEdit}>Edit</button>
            </div>
        );
    }

    return (
        <div className="register">
            <h1 className="heading">Register on ItelliHub</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    value={formData.name}
                    onChange={handleChange}
                />
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
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;