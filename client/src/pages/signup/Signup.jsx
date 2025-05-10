import React, { useState, useEffect, useCallback } from "react";
import "./Signup.css";
import { CheckCircledIcon, CrossCircledIcon, EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons"
import { CheckEmail, SignupUser } from '../../apicalls/user'
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../../store/toastSlice';
import { useNavigate } from "react-router";

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

  // Datas
  const roleRoutes = {
    Student: '/',
    Admin: '/admin',
    Tutor: '/tutor',
  };

  // Store 
  const user = useSelector((state)=> state.user);
  const role = user?.role;

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
  const [emailChecked, setEmailChecked] = useState(false);
  const [isEmailTaken, setisEmailTaken] = useState(false);

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

  const handleLogin = ()=>{
    navigate('/login');
  }

  // Handles submission of formdata
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {confirmpassword,...updatedFormData} = formData;
    try{
        const response = await SignupUser(updatedFormData);
        if(response.success === true){
            dispatch(showToast({ message: `${response.message}`, type: 'success' }));
            setFormData(formData);
            setIsFocused(isFocused);
            setTimeout(() => {
              navigate('/login');
            }, 500);
        }else{
            dispatch(showToast({ message: `${response.message}`, type: 'info' }));
        }
    }catch(error){
        dispatch(showToast({ message: `${error.message}`, type: 'error'}));
    }
  };

  // Check of email already exists
  const checkEmail = async (email) => {
    setEmailChecked(false);
    if (!email) return;

    try {
      const response = await CheckEmail(email);
      const exists = response.success;
      setisEmailTaken(exists);
      setEmailChecked(true);
    } catch (error) {
      console.error("Email check failed", error);
      setEmailStatus("Error");
      setEmailChecked(true);
    }
  };

  // Debounce the API call
  const debouncedCheckEmail = useCallback(debounce(checkEmail, 3000), []);

  useEffect(() => {
    debouncedCheckEmail(formData.email);
  }, [formData.email, debouncedCheckEmail]);

 useEffect(() => {
    if (role && roleRoutes[role]) {
      navigate(`${roleRoutes[role]}`);
    }
  }, [role]);


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
              <span>
                {emailChecked && (
                  isEmailTaken ? 
                  <CrossCircledIcon style={{color: "var(--redresult-color)" }}/>
                  : 
                  <CheckCircledIcon style={{color: "var(--greenresult-color)" }}/> 
                )}
              </span>
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
            Already have an account.<a onClick={handleLogin}>Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
