import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./signup.scss"
const url = "http://localhost:3000/user/signup";

function Signup() {
  var navigate = useNavigate();
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");

  function toLogin() {
    navigate("/");
  }

  function signup() {
    axios
      .post(url, { email, password })
      .then(({ data }) => {
        if (data.token) {
          //after login token returns
          localStorage.setItem("token", data.token);//we are saving token to local storage
          //if token returns navigate to profile
          navigate("/upload"); //******navitaging to page */
        } else {
          alert(data.msg);
        }
      })
      .catch((error) => {
        console.error("Error signing up:", error);
        alert("Error signing up. Please try again.");
      });
  }

  return (
    <div className="login-form">
      <input
        type="email"
        placeholder="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        onClick={() => {
          signup();
        }}
      >
        Signup
      </button>
      <p>
        you have an account?
        <a
          onClick={() => {
            toLogin();
          }}
        >
          Login
        </a>
      </p>
    </div>
  );
}

export default Signup;
