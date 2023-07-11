import Signup from "./Signup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../app.css"


const url = "http://localhost:3000/user/login";

function Login() {
  var navigate = useNavigate();
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");

  function toSignup() {
    navigate("/signup");
  }

  function login() {
    axios
      .post(url, { email, password })
      .then(({ data }) => {
        if (data.token) {
          //after login token returns
          localStorage.setItem("token", data.token); //we are saving token to local storage
          //if token returns navigate to profile
          navigate("/profile"); //******navitaging to page */
        } else {
          alert(data.msg);
        }
      })
      .catch((error) => {
        console.error("Error loggin:", error);
        alert("Error login. Please try again.");
      });
  }

  return (
    <div>
      <Form id="form">
<Form.Group className="mb-3" controlId="formBasicEmail">
  <Form.Label>Email address</Form.Label>
  <Form.Control type="email" placeholder="Enter email" onChange={(e) => {
          setEmail(e.target.value);
        }}/>
  <Form.Text className="text-muted">
    We'll never share your email with anyone else.
  </Form.Text>
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label>Password</Form.Label>
  <Form.Control type="password" placeholder="Password"  onChange={(e) => {
          setPassword(e.target.value);
        }}/>
</Form.Group>
<Button variant="primary" type="submit" onClick={() => {
          login();
        }}>
  Submit
</Button>
<br/>
<p>
        you don't have an account?{" "}
        <Button variant="success"
          onClick={() => {
            toSignup();
          }}
         >
          signup
        </Button>
      </p>
</Form>
    </div>
  );
}

export default Login;
