import React from 'react'
import './Login.css'

const Login = () => {
  return (
    <div className="login-container">
        <div className="login">
            <div className="login-poster">
                <img src="./src/assets/login-poster.svg" alt="login poster"/>
            </div>
            <div className="login-form">
                <p>Log in to continue your learning journey</p>
                <div className="form form-email">
                    <input id="email" required></input>
                    <label for="email">Email</label>
                </div>
                <button>Sign up</button>
                <div className="line">
                    <hr/>
                    <span>Other log in options</span>
                    <hr/>
                </div>
                <p>Signin with google</p>
                <p>Don't have an account.<a>Sign up</a></p>
            </div>
        </div>
    </div>
  )
}

export default Login