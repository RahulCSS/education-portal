import React from 'react'
import {Outlet} from 'react-router'

const AuthLayout = () => {
  return (
    <div style={{backgroundColor: "var(--white-color)"}}>
    <Outlet />
    </div>
  )
}

export default AuthLayout