import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ThemeContext } from "./context/ThemeContext";

import Home from "./pages/Home";
import ToDo from "./pages/ToDo";
import Register from "./pages/Register";
import Products from "./pages/Products";
import TextGenerator from "./pages/TextGenerator";

function App() {

  const {theme} = useContext(ThemeContext);

  return (
    <div
      className={theme}
      style={{ minHeight: "100vh" }}
    >
        <Navbar />

        {/* 🔹 Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<ToDo />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/text-generator" element={<TextGenerator />} />
        </Routes>
    </div>
  );
}

export default App;