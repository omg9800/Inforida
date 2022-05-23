import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services//service";
import { toast } from "react-toastify";
import { validate } from "./../../utils";
function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const saveUser = async () => {
    let message = validate(user);
    if (message !== "success") {
      toast.error(message);
      return;
    }
    const res = await register(user);
    const response = await res.json();

    if (res.status == 200) {
      toast.success("Registered successfully!");
      navigate("/login");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="form-bg">
      <div className="form-container">
        <h1>Register</h1>
        <ul className="list-container">
          <li className="item">
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
            />
          </li>

          <li className="item">
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
          </li>
          <li className="item">
            <input
              type="text"
              name="phone"
              placeholder="Mobile Number"
              onChange={handleChange}
            />
          </li>

          <li className="item">
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </li>
          <li>
            <button className="submit-btn" onClick={saveUser}>
              Sign Up
            </button>
          </li>
        </ul>
        <div className="div-redirect">
          <span className="not">Already Resistered?</span>
          <Link className="redirect" to="/login">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
