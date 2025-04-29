import React, { useState } from "react";
import "./Login.css";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons"
import { LoginUser } from '../../apicalls/user'
import { useDispatch } from 'react-redux';
import { showToast } from '../../store/toastSlice';
import { setUser } from "../../store/userSlice";
import { useNavigate } from "react-router";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // *** Local States ***
  // FormData
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Input focus & label transition
  const [isFocused, setIsFocused] = useState({
    isemail: false,
    ispassword: false,
  });

  const [passwordVisible,setPasswordVisible] = useState(false);

  // *** Handlers ***
  // Handles input value changes & stores in local state
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
  
    setFormData(updatedFormData);

    if(value.length > 0){
      setIsFocused({
          ...isFocused,
          [`is${name}`]: true,
      });
    } else if(value.length == 0){
        setIsFocused({
            ...isFocused,
            [`is${name}`]: false,
        });
    }
  };

  // Handles password visibility
  const togglevisiblity = () =>{
    setPasswordVisible(!passwordVisible);
  }

  const handleSignUp = ()=>{
    navigate('/signup');
  };

   // Handles submission of formdata
   const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await LoginUser(formData);
        console.log(response);
        if(response.success === true){
            dispatch(showToast({ message: `${response.message}`, type: 'success' }));
            dispatch(setUser(response.userData));
            setFormData(formData);
            setIsFocused(isFocused);
            setTimeout(() => {
              navigate('/');
            }, 500);
        }else{
            dispatch(showToast({ message: `${response.message}`, type: 'info' }));
        }
    }catch(error){
        dispatch(showToast({ message: `${error.message}`, type: 'error'}));
    }
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
                className={isFocused.isemail ? "focused" : ""}
                htmlFor="email"
              >
                Email
              </label>
            </div>
            <div className="loginform">
              <input
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                minLength="8"
                title="Please enter password"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                value={formData.password}
                onChange={handleChange}
                required
              ></input>
              <label
                className={isFocused.ispassword ? "focused" : ""}
                htmlFor="password"
              >
                Password
              </label>
              <span className="eye" onClick={togglevisiblity}>
              {passwordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
                </span>
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
            Don't have an account.<a onClick={handleSignUp}>Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
