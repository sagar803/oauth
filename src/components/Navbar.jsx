import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

export const Navbar = () => {
  const user = localStorage.getItem('user');
  const logout = () => { 
    window.open(`${import.meta.env.VITE_LOCAL}/auth/logout`, "_self")
    localStorage.removeItem('user');
    localStorage.removeItem('token')
  }
  return (
    <nav>
        <span><Link className="link" to="/">Postinger</Link></span>
        {user 
          ? <p style={{cursor: 'pointer'}} onClick={logout}>Logout</p>
          : <Link className="link login" to="Login" >Login</Link>
        }
    </nav>
  )
}
