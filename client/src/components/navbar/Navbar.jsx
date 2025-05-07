import React, { useState, useRef, useEffect } from 'react'
import { PersonIcon, SunIcon, ReaderIcon, MoonIcon } from "@radix-ui/react-icons"
import './Navbar.css'
import { LogoutUser } from '../../apicalls/user'
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../../store/toastSlice';
import { clearUser } from '../../store/userSlice';
import { useNavigate } from "react-router";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useSelector((state) => state.user.id);

    // Local States
    const [lightMode , setLightMode] = useState(true);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const profilemenuRef = useRef(null);
    
    // Handlers
    const toggleMode = ()=>{
        setLightMode(!lightMode);
    };
    const toogleShowProfileMenu = ()=>{
        setShowProfileMenu(!showProfileMenu);
    };
    const handleLogin = () => {
      navigate('/login');
    }

    const handleSignup = () => {
      navigate('/signup');
    }
    const handleLogout = async()=>{
      if(userId){
        try{
          const response = await LogoutUser(userId);
          if(response.success === true){
            console.log(response);
            dispatch(clearUser());
            dispatch(showToast({ message: `${response.message}`, type: 'success' }));
            setTimeout(() => {
              navigate('/');
            }, 500);
          }else{
            console.log(response);
            dispatch(showToast({ message: `${response.message}`, type: 'info' }));
          }
        }catch(error){
          dispatch(showToast({ message: `${error.message}`, type: 'error'}));
        }
      }
      else{
        dispatch(showToast({ message: 'User not logged in', type: 'info' }));
      }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (profilemenuRef.current && !profilemenuRef.current.contains(event.target)) {
            setShowProfileMenu(false);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }, []);

  return (
    <div className="navbar">
      <div className="title">
        <img src="./src/assets/brain.png" alt="logo" />
        <a>Elevate</a>
        <a>lms</a>
      </div>
      <ul className="menu">
        <li>Explore</li>
        <li>Academy</li>
        <li>AboutUs</li>
        <li>ContactUs</li>
      </ul>
      <div className="profile" ref={profilemenuRef}>
        <a onClick={toggleMode}>
          <div className="icon-wrapper">
            <span className={`icon ${lightMode ? "visible" : ""}`}>
              <SunIcon />
            </span>
            <span className={`icon ${!lightMode ? "visible" : ""}`}>
              <MoonIcon />
            </span>
          </div>
        </a>
        <a onClick={toogleShowProfileMenu} className="profile-menu" >
          <PersonIcon />
            {showProfileMenu ? userId ?(
            <div className="dropdown-menu" >
                <ul>
                <li>My Profile</li>
                <li>Settings</li>
                <li onClick={handleLogout}>Logout</li>
                </ul>
            </div>
            ) : <div className="dropdown-menu" >
                  <div className="login-signup">
                    <span className="link" onClick={handleLogin}>Login</span>
                    <span>or</span>
                    <span><span className="link" onClick={handleSignup}>Signup</span>for new account</span>
                  </div>
                </div>
            : <></>}
        </a>
        <a>
          <ReaderIcon />
        </a>
      </div>
    </div>
  );
}

export default Navbar