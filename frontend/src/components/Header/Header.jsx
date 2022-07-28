import React, { useContext } from 'react'
import AuthContext from '../../context/AuthContext'

function Header() {
    const { user, logout } = useContext(AuthContext);
    const hello = (e) => {
        e.preventDefault();
        logout()
    }
  return (
    <div>
      <div className='container'>
        <div className='d-flex justify-content-between px-3 ps-sm-0 pe-sm-5'>
            <div>
                <p className='fs-5'>Welcom {user.email}</p>
            </div>
            <div>
                <a href='' onClick={hello}>Logout </a>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Header
