import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./Login.css";
import API_URL from "../../config/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    axios
      .post(
        `${API_URL}/user/login`,
        { username, password },
        { withCredentials: true },
      )
      .then(() => {
        nav("/home");
      })
      .catch(() => {
        setError("Invalid username or password.");
      });
  };
  
  const handleCancel = () => {
    setUsername("");
    setPassword("");
    setError("");
  };

  return (
    <div className="login_container">
      <div className="login_main">

        <div className="form_header">
          <h1>Login</h1>
          <button onClick={() => nav(-1)}>×</button>
        </div>

        <form className="login_form" onSubmit={handleSubmit}>
          <div className="form_body">
            <div className="form_item">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </div>

            <div className="form_item">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
          </div>

          <div className="actions">
            <button type="submit">ok</button>
            <button type="button" onClick={handleCancel}>cancel</button>
          </div>

        </form>
      </div>

      {error && (
        <div
          className="error-message"
          style={{ color: "red", marginTop: "0px" }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
