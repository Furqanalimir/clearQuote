import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
  const user = localStorage.getItem('user');
  console.log(user)
  const handleClick = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }
  return (
    <div>
      <ul>
        <li>
          <Link to='/'>Home</Link>
          {
            user === undefined || user === null ? <Link to='/update'>Login</Link> : <Link to='/' onClick={handleClick}>Logout</Link>
          }
          <Link to='/update'>Edit Profile</Link>
        </li>
      </ul>
    </div>
  )
}

export default Header;