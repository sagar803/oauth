import "./Login.css"
import Google from "../img/google.png";
import Facebook from "../img/facebook.png";
import Github from "../img/github.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
  
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const [inlogin, setInLogin] = useState(true);
 
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({
      ...user, 
      [name]:value
    })
  }
  const google = () => {
    window.open("http://oauth-server-virid.vercel.app/auth/google")
  }

  const login = async (event) => {
    event.preventDefault();
    const { email, password} = user;
    
    const loggedInResponse = await fetch("http://oauth-server-virid.vercel.app/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password})
      }
    )
    const loggedIn = await loggedInResponse.json();
    if (loggedIn) {
      props.setUser(loggedIn);
      console.log(loggedIn)
      navigate("/");
    }
  }
  
  const register = async (event) => {
    event.preventDefault();
    const { email, password} = user;
    const registerResponse = await fetch("http://oauth-server-virid.vercel.app/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password})
      }
    )
    const registered = await registerResponse.json();
    if (registered) {
      console.log("registered");
    }
  }
  
  return (
    <div className="login">
      <h1 className="loginTitle">Choose a Login Method</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          <div className="loginButton facebook" >
            <img src={Facebook} alt="" className="icon" />
            Facebook
          </div>
          <div className="loginButton github" >
            <img src={Github} alt="" className="icon" />
            Github
          </div>
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
          <form autoComplete="off" className="right" action="">
            <input name="email" type="email" placeholder="Email" onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" onChange={handleChange}/>
            <button className="submit" onClick={inlogin ? login : register}>{inlogin ? "Login" : "Register" }</button>
            <p className="loginRegister"
              onClick={() => setInLogin(!inlogin)}
              >
                {inlogin ? "Didn't have an account? Register" : "Already have an account? Login" }
            </p>
          </form>
      </div>
    </div>
  );
};

export default Login;