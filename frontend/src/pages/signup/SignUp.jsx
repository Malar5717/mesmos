import React, { useState } from "react";
import axios from "axios";
import "./SignUp.css";
import { useNavigate } from "react-router";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [usermail, setUsermail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!username || !usermail || !password) {
      setError("All fields are required!");
      return;
    }

    axios
      .post(
        "http://localhost:3000/user/signup",
        { username, usermail, password },
        { withCredentials: true },
      )
      .then(() => {
        nav("/home");
      })
      .catch((err) => {
        const msg =
          err.response?.data?.msg || "Signup failed. Please try again.";
        setError(msg);
      });
  };

  const handleCancel = () => {
    setUsername("");
    setUsermail("");
    setPassword("");
    setError("");
  };

  return (
    <div className="signup_container">
      <div className="signup_main">
        <div className="form_header">
          <h1>Sign Up</h1>
          <button type="button" onClick={() => nav(-1)}>×</button>
        </div>

        <form className="signup_form" onSubmit={handleSubmit}>
          <div className="form_body">

            <div className="form_item">
              <label htmlFor="username">enter username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </div>

            <div className="form_item">
              <label htmlFor="usermail">enter email:</label>
              <input
                type="email"
                id="usermail"
                value={usermail}
                onChange={(e) => setUsermail(e.target.value)}
              ></input>
            </div>

            <div className="form_item">
              <label htmlFor="password">create password:</label>
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
