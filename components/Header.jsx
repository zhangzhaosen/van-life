import React from "react"
import {Link,  NavLink } from "react-router-dom"
export default function Header() {
    return <header>
        <Link className="site-logo" to="/">#VanLife</Link>
        <nav>
            <NavLink to="/host"
                className={({ isActive }) => {
                    return isActive ? 'active-link' : ''
                }}
            >Host</NavLink>
            <NavLink to="/about"
                className={({ isActive }) => {
                    return isActive ? 'active-link' : ''
                }}
            >About</NavLink>
            <NavLink to="/vans"
                className={({ isActive }) => {
                    return isActive ? 'active-link' : ''
                }}
            >Vans</NavLink>
        </nav>
    </header>
}