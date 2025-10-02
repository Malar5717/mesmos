import React, { useState } from "react"
import axios from "axios"
import "./SignUp.css"

export default function SignUp() {

    const [ username, setUsername ] = useState("")
    const [ usermail, setUsermail ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleSubmit = (e) => {
    e.preventDefault(); // form refreshes upon submit
    if (!username || !usermail || !password) {
      return;
    }
    // feature of browser
    
    // const formData = new FormData();
    // formData.append("username", username);
    // formData.append("usermail", usermail);
    // formData.append("password", password);

    axios
      .post("http://localhost:3000/user/signup", { username, usermail, password }, { withCredentials: true })
      .then((res) => { console.log(res) })
      .catch((err) => { console.log(err) });
  };

  return (
    <form className="signup_main" onSubmit={handleSubmit}>
      <div className="form-item">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={ username } onChange={(e) => setUsername(e.target.value)}></input>
      </div>

      <div className="form-item">
        <label htmlFor="usermail">Email:</label>
        <input type="email" id="usermail" value={ usermail } onChange={(e) => setUsermail(e.target.value)}></input>
      </div>

      <div className="form-item">
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={ password } onChange={(e) => setPassword(e.target.value)}></input>
      </div>

      <button>submit</button>
    </form>
  );
}
