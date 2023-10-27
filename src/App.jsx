import { useEffect, useState } from "react"
import { BrowserRouter, Navigate, Routes, Route, redirect } from "react-router-dom"
import './App.css'
import {Navbar} from './components/Navbar'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Post } from './pages/Post'

function App() {
  const [isAuth, setIsAuth] = useState(false);
  console.log(isAuth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    console.log(user)

    if (token && user) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [isAuth]);

  
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route 
              path="/" 
              element={ isAuth ? <Home isAuth={isAuth} setIsAuth={setIsAuth} /> : <Navigate to="/login"/>} 
          />
          <Route 
              path="/login" 
              element={ isAuth ? <Navigate to="/"/> : <Login isAuth={isAuth} setIsAuth={setIsAuth}/>} 
          />
          <Route 
              path="/posts/post/:id" 
              element={ isAuth ? <Post isAuth={isAuth} setIsAuth={setIsAuth}/> : <Navigate to="/login"/>} 
          />          
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
