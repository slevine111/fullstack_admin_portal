import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ location: { pathname } }) => {
  const arrayOfNavs = [
    { label: 'Home', path: '/' },
    { label: 'Campuses', path: '/campuses' },
    { label: 'Students', path: '/students' }
  ]

  return (
    <ul className="nav">
      {arrayOfNavs.map(navItem => {
        return (
          <li key={navItem.label} className="nav-item">
            <Link
              className={`nav-link ${
                navItem.path === pathname ? 'active' : ''
              }`}
              to={navItem.path}
            >
              {navItem.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default Navbar
