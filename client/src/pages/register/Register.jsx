import React, { useState } from "react";
import "./Register.css";

const Register = () => {
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

  // To check password match
  const [passwordMatch, setPasswordMatch] = useState('false');

  // *** Handlers ***
  // Handles input value changes & stores in local state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

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

    if(name == confirmpassword && value.length > 0){
        setPasswordMatch(formData.password === formData.confirmpassword);
    }
  };

  // Handles input focus state
  const handleFocus = (e) => {
    setIsFocused({
      ...isFocused,
      [`is${e.target.name}`]: true,
    });
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
    <div className="register-container">
      <div className="register">
        <div className="register-poster">
          <img src="./src/assets/register-poster.svg" alt="login poster" />
        </div>
        <div className="register-form">
          <p>Sign up with email</p>
          <form>
            <div className="form">
              <input
                id="fullname"
                name="fullname"
                type="text"
                maxLength="32"
                title="Please enter your full name"
                value={formData.fullname}
                onChange={handleChange}
                onFocus={handleFocus}
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
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}"
                title="Please enter valid email address"
                value={formData.email}
                onChange={handleChange}
                onFocus={handleFocus}
                required
              ></input>
              <label className={isFocused.isemail ? "focused" : ""}
              htmlFor="email">Email</label>
            </div>
            <div className="form">
              <input
                id="password"
                name="password"
                type="password"
                minLength="8"
                title="Please enter correct password of length 8"
                value={formData.password}
                onChange={handleChange}
                onFocus={handleFocus}
                required
              ></input>
              <label
                className={isFocused.ispassword ? "focused" : ""}
                htmlFor="password"
              >
                Password
              </label>
            </div>
            <div className="form">
              <input
                id="confirmpassword"
                name="confirmpassword"
                type="password"
                minLength="8"
                title="Please re-enter the password"
                value={formData.confirmpassword}
                onChange={handleChange}
                onFocus={handleFocus}
                required
              ></input>
              <label
                className={isFocused.isconfirmpassword ? "focused" : ""}
                htmlFor="confirmpassword"
              >
                Confirm Password
              </label>
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
