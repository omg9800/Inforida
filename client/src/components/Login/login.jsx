import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { login } from "./../../services/service";
import { validate } from "./../../utils";
import { toast } from "react-toastify";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const verifyUser = async (event) => {
    let message = validate({ username, password });
    if (message !== "success") {
      toast.error(message);
      return;
    }
    try {
      const res = await login({ phone: username, password });
      const response = await res.json();
      if (res.status == 400) toast.error(response.message);
      else {
        setUser(response?.user);
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("userId", JSON.stringify(response.user._id));
        localStorage.setItem("token", JSON.stringify(response.token));
        toast.success("Logged In Successfully.");
        navigate("/");
      }
    } catch (er) {
      console.log(er);
    }
    event.preventDefault();
  };

  return (
    <div className="form-bg">
      <div className="form-container">
        <h1>Login</h1>
        <ul className="list-container">
          <li className="item">
            <input
              type="text"
              placeholder="Phone"
              onChange={(e) => setUsername(e.target.value)}
            />
          </li>
          <li className="item">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li>
            <button className="submit-btn" onClick={verifyUser}>
              Submit
            </button>
          </li>
        </ul>

        <div className="div-redirect">
          <span className="not">Not Resistered?</span>
          <Link className="redirect" to="/register">
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
