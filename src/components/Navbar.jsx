import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

export const Navbar = (props) => {
  const logout = () => {
    window.open("http://oauth-server-virid.vercel.app/auth/logout", "_self");
  }
  return (
    <nav>
        <span><Link className="link" to="/">Postinger</Link></span>
        {props.user 
          ? (<ul>
              <li onClick={logout}>Logout</li>
            </ul>)
          : (
            <Link className="link login" to="Login" >Login</Link>
          )
        }
    </nav>
  )
}
