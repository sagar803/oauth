import { useEffect, useState } from "react"
import { BrowserRouter, Navigate, Routes, Route, redirect } from "react-router-dom"
import './App.css'
import {Navbar} from './components/Navbar'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Post } from './pages/Post'

function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  
  useEffect(() => {
    const getUser = () => {
      fetch("http://oauth-server-virid.vercel.app/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);
  console.log(user);
  if(!user){
    return null;
  }
  return (
    <BrowserRouter>
      <div>
        <Navbar  user={user} setUser={setUser}/>
        <Routes>
          <Route 
              path="/" 
              element={ user 
                ? <Home user={user} setUser={setUser} posts={posts} setPosts={setPosts} /> 
                : <Navigate to="/login"/>} />
          <Route 
              path="/login" 
              element={<Login user={user} setUser={setUser} />} />
          <Route 
              path="/posts/post/:id" 
              element={ user 
                ? <Post user={user} setUser={setUser} posts={posts} setPosts={setPosts} /> 
                : <Navigate to="/login"/>} />  
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
