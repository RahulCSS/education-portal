import React, { useState, useRef, useEffect } from 'react'
import { PersonIcon, SunIcon, ReaderIcon, MoonIcon } from "@radix-ui/react-icons"
import './Navbar.css'
import { LogoutUser } from '../../apicalls/user'
import { useDispatch } from 'react-redux';
import { showToast } from '../../store/toastSlice';
import { useNavigate } from "react-router";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const handleLogout = async()=>{
         try{
                const response = await LogoutUser(formData);
                if(response.success === true){
                    dispatch(showToast({ message: `${response.message}`, type: 'success' }));
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
            {showProfileMenu && (
            <div className="dropdown-menu" >
                <ul>
                <li><a>My Profile</a></li>
                <li><a>Settings</a></li>
                <li><a onClick={handleLogout}>Logout</a></li>
                </ul>
            </div>
            )}
        </a>
        <a>
          <ReaderIcon />
        </a>
      </div>
    </div>
  );
}

export default Navbar