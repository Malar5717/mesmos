import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // form refreshes upon submit
    if (!username || !password) {
      return;
    }

    // cant use form data
    axios
      .post(
        "http://localhost:3000/user/login",
        { username, password },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login_container">
      <div className="login_main">

        <div className="form_header">
          <h1>Login</h1>
          <button>×</button>
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
              <button>cancel</button>
            </div>

          </form>
      </div>
    </div>
  );
}
