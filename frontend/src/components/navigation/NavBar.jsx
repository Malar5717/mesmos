import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./NavBar.css";
import { Link } from "react-router-dom";

// conditional rendering
function NavBar({ onAddClick, isCreateOpen }) {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const isAuth = () => {
      axios
        .get("http://localhost:3000/user/protected", { withCredentials: true })
        .then((res) => setIsVerified(res.data.isVerified))
        .catch((err) => console.log(err));
    };
    isAuth();
  }, []);

  return (
    <div className="navbar_main">
      <div className="logo">
        <p>mesmos</p>
      </div>
      <div className="account">
        {isVerified && (
          <>
          {/* to do: its toggle, but you can't really close create after opening it  */}
            <p onClick={() => onAddClick(!isCreateOpen)}>create</p>
            <Link to="/pola/my">my memories</Link>
            <span
            className="material-symbols-outlined"
              onClick={() =>
                axios
                  .get("http://localhost:3000/user/logout", {
                    withCredentials: true,
                  })
                  .then(() => setIsVerified(false))
              }
            >
              logout
            </span>
          </>
        )}

        {!isVerified && (
          <>
            <Link to="/signup">signup</Link>
            <Link to="/login">login</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;
