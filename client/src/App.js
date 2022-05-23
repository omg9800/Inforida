import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/navbar";
import Login from "./components/Login/login";
import Register from "./components/Register/register";
import Schools from "./components/Schools/Schools";
import SchoolAddForm from "./components/SchoolForm/addForm";
import SchoolEditForm from "./components/SchoolForm/editForm";

function App() {
  const [user, setUser] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  return (
    <div className="App">
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
        />
        <Route
          path="/"
          element={user ? <Schools /> : <Navigate to={"/login"} />}
        />

        <Route path="/register" element={<Register />} />
        <Route path="/new" element={<SchoolAddForm />} />
        <Route path="/edit" element={<SchoolEditForm />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
