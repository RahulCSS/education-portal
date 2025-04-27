import React, { useState } from "react";
import "./Login.css";

const Login = () => {

  // *** Local States ***
  // FormData
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Input focus & label transition
  const [isFocused, setIsFocused] = useState({
    isEmail: false,
    isPassword: false,
  });

  // Success & Error messages
  const [messages, setMessages] = useState([]);

  // *** Handlers ***
  // Handles input value changes & stores in local state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "email") {
      if (value.length > 0) {
        setIsFocused({
          ...isFocused,
          isEmail: true,
        });
      } else if (value.length == 0) {
        setIsFocused({
          ...isFocused,
          isEmail: false,
        });
      }
    } else if (name === "password") {
      if (value.length > 0) {
        setIsFocused({
          ...isFocused,
          isPassword: true,
        });
      } else if (value.length == 0) {
        setIsFocused({
          ...isFocused,
          isPassword: false,
        });
      }
    }
  };

  // Handles validation of formdata before submission;

  // Handles submission of formdata
  const handleSubmit = async () => {
    console.log(formData);
    // try{
    //     const response = await LoginUser(values);
    //     if(response.success){
            
            
    //     }else{
            
    //     }
    // }catch(error){
        
    // }
    //form.resetFields();
  };

  return (
    <div className="login-container">
      <div className="login">
        <div className="login-poster">
          <img src="./src/assets/login-poster.svg" alt="login poster" />
        </div>
        <div className="login-form">
          <p>Log in to continue your learning journey</p>
          <form onSubmit={handleSubmit}>
            <div className="loginform">
              <input
                id="email"
                name="email"
                type="email"
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                title="Please enter your email address"
                value={formData.email}
                onChange={handleChange}
                required
              ></input>
              <label
                className={isFocused.isEmail ? "focused" : ""}
                htmlFor="email"
              >
                Email
              </label>
            </div>
            <div className="loginform">
              <input
                id="password"
                name="password"
                type="password"
                minLength="8"
                title="Please enter password of length 8"
                value={formData.password}
                onChange={handleChange}
                required
              ></input>
              <label
                className={isFocused.isPassword ? "focused" : ""}
                htmlFor="password"
              >
                Password
              </label>
            </div>
            <button>Log in</button>
          </form>
          <div className="line">
            <hr />
            <span>Other log in options</span>
            <hr />
          </div>
          <p>Signin with google</p>
          <p>
            Don't have an account.<a>Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
