import React from 'react'
import './Register.css'

const Register = () => {
  return (
    <div className="register-container">
        <div className="register">
            <div className="register-poster">
                <img src="./src/assets/register-poster.svg" alt="login poster"/>
            </div>
            <div className="register-form">
                <p>Sign up with email</p>
                <div className="form form-name">
                    <input id="fullname" required></input>
                    <label for="fullname">Full name</label>
                </div>
                <div className="form form-email">
                    <input id="email" required></input>
                    <label for="email">Email</label>
                </div>
                <button>Sign up</button>
                <div className="line">
                    <hr/>
                    <span>Other sign up options</span>
                    <hr/>
                </div>
                <p>Signup with google</p>
                <p>Already have an account.<a>Log in</a></p>
            </div>
        </div>
    </div>
  )
}

export default Register