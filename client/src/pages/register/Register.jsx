import React, { useState } from "react";
import "./Register.css";
import { CheckCircledIcon, EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons"
import { SignupUser } from '../../apicalls/user'
import { useDispatch } from 'react-redux';
import { showToast } from '../../store/toastSlice';

const Register = () => {
    const dispatch = useDispatch();

  // *** Local States ***
  // FormData
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmpassword:'',
  });

  // Input focus & label transition
  const [isFocused, setIsFocused] = useState({
    isfullname: false,
    isemail: false,
    ispassword: false,
    isconfirmpassword: false,
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

  // Handles submission of formdata
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {confirmpassword,...updatedFormData} = formData;
    try{
        const response = await SignupUser(updatedFormData);
        if(response.success === true){
            dispatch(showToast({ message: `${response.message}`, type: 'success' }));
        }else{
            dispatch(showToast({ message: `${response.message}`, type: 'info' }));
        }
    }catch(error){
        dispatch(showToast({ message: `${error.message}`, type: 'error'}));
    }
  };

  return (
    <div className="register-container">
      <div className="register">
        <div className="register-poster">
          <img src="./src/assets/register-poster.svg" alt="login poster" />
        </div>
        <div className="register-form">
          <p>Sign up with email</p>
          <form onSubmit={handleSubmit}>
            <div className="form">
              <input
                id="fullname"
                name="fullname"
                type="text"
                maxLength="32"
                title="Please enter your full name"
                value={formData.fullname}
                onChange={handleChange}
                required
              ></input>
              <label className={isFocused.isfullname ? "focused" : ""}
              htmlFor="fullname">Full name</label>
            </div>
            <div className="form">
              <input
                id="email"
                name="email"
                type="email"
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                title="Please enter valid email address"
                value={formData.email}
                onChange={handleChange}
                required
              ></input>
              <label className={isFocused.isemail ? "focused" : ""}
              htmlFor="email">Email</label>
            </div>
            <div className="form">
              <input
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                minLength="8"
                title="Must contain at least one number, one uppercase, lowercase letter and at least 8 characters"
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
            <div className="form">
              <input
                id="confirmpassword"
                name="confirmpassword"
                type="password"
                minLength="8"
                title="Please re-enter the password"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                value={formData.confirmpassword}
                onChange={handleChange}
                required
              ></input>
              <label
                className={isFocused.isconfirmpassword ? "focused" : ""}
                htmlFor="confirmpassword"
              >
                Confirm Password
              </label>
              {formData.password.length >7 && formData.confirmpassword.length >7 && formData.password == formData.confirmpassword && (
                <span>
                <CheckCircledIcon style={{color: formData.password === formData.confirmpassword ? "var(--greenresult-color)" : "var(--redresult-color)"}}/>
                </span>
                )}
            </div>
            <button>Sign up</button>
          </form>
          <div className="line">
            <hr />
            <span>Other sign up options</span>
            <hr />
          </div>
          <p>Signup with google</p>
          <p>
            Already have an account.<a>Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
