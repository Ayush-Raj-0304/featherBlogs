import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout as authLogout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(authLogout())
        })
    }
  return (
    <button
    className='bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn