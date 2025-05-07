import React,{useState, useRef, useEffect} from 'react'
import './admin.css'
import Dashboard from '../../components/adminpage/dashboard/Dashboard';
import { DashboardIcon, AvatarIcon, PersonIcon, BellIcon, ArchiveIcon, 
  QuestionMarkCircledIcon, RowsIcon, SunIcon, MoonIcon } from "@radix-ui/react-icons"
import { LogoutUser } from '../../apicalls/user';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../../store/toastSlice';
import { clearUser } from '../../store/userSlice';
import { useNavigate } from 'react-router';

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.id);

  const menu = [
    ['Dashboard',<DashboardIcon />],
    ['Students',<AvatarIcon />],
    ['Tutors',<PersonIcon />],
    ['Courses',<ArchiveIcon />],
    ['Announcements',<BellIcon />],
    ['Queires',<QuestionMarkCircledIcon />]
  ];

  // Local State
  const [lightMode , setLightMode] = useState(true);
  const [ showUserMenu, setShowUserMenu ] = useState(false);
  const usermenuRef = useRef(null);

  // Handlers
  const toggleMode = ()=>{
    setLightMode(!lightMode);
  };
  const toogleshowUserMenu = () => {
    setShowUserMenu(!showUserMenu);
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
            if (usermenuRef.current && !usermenuRef.current.contains(event.target)) {
              setShowProfileMenu(false);
            }
          };
      
          document.addEventListener('mousedown', handleClickOutside);
      
          return () => document.removeEventListener('mousedown', handleClickOutside);
        }, []);

  return (
    <div className="admin-container">
      <div className="admin-grid">
        <div className="sidebar">
          <div className="avatar">
            <AvatarIcon />
            <p>LMS Admin</p>
          </div>
          {menu.map((items,index)=> {
            return (
              <div key= {index} className='menu-icon'>
                <a>{items[1]}</a>
                <span>{items[0]}</span>
              </div>
            )
          })}
        </div>
          <div className="topbar">
            <div className="admin-menu">
              <span onClick={toogleshowUserMenu}>
                <RowsIcon />
              </span>
              <span>Menu</span>
              <div className={`user-menu ${showUserMenu ? 'open' : ''}`} >
                <ul>
                <li>My Profile</li>
                <li>Settings</li>
                <li onClick={handleLogout}>Logout</li>
                </ul>
            </div>
            </div>
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
          </div>
          <div className="content">
            <Dashboard />
          </div>
      </div>
    </div>
  )
}

export default Admin;