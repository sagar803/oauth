import "./Login.css"
import Google from "../img/google.png";
import Facebook from "../img/facebook.png";
import Github from "../img/github.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = ({setIsAuth}) => {
  
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })
  const [pageType, setPageType] = useState('login');

  const getUser = async () => {
    try{
      const response = await fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
      if(response.ok){
        const data = response.json();
        console.log(data)
        localStorage.setItem('user', data.user.__json);
        localStorage.setItem('user' , data.token);
      } 
    } catch (error) {
      console.log(error);      
    }
  };
  
  const google = () => {
    window.open(`${import.meta.env.VITE_LOCAL}/auth/google`, "_self")
    getUser();
  }

  const auth = async (event) => {
    event.preventDefault();
    try {
      const loggedInResponse = await fetch(`${import.meta.env.VITE_LOCAL}/api/${pageType}`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(credentials)
        }
      )
      if (loggedInResponse.ok) {
        const data = await loggedInResponse.json();
        localStorage.setItem('user' , data.user.__json);
        localStorage.setItem('token' , data.token);
        setIsAuth(true);
      }
    } catch (error) {
      console.log(error);
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
          <input 
            name="email" 
            type="email" 
            placeholder="Email" 
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} 
          />
          <input 
            name="password" 
            type='password' 
            placeholder="Password" 
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} 
          />
          <button className="submit" onClick={auth}>{(pageType) === 'login' ? 'login' : 'register'}</button>
          <p className="loginRegister" onClick={() => setPageType((pageType) === 'login' ? 'register' : 'login')}>
              {(pageType) === 'login' ? "Didn't have an account? Register" : "Already have an account? Login" }
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;