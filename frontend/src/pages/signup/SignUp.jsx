import React, { useState } from "react";
import axios from "axios";
import "./SignUp.css";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [usermail, setUsermail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // form refreshes upon submit
    if (!username || !usermail || !password) {
      return;
    }

    axios
      .post(
        "http://localhost:3000/user/signup",
        { username, usermail, password },
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
    <div className="signup_container">
      <div className="signup_main">

        <div className="form_header">
          <h1>Sign Up</h1> 
          <button>×</button>
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
            <button>cancel</button>
          </div>

        </form>
      </div>
    </div>
  );
}
