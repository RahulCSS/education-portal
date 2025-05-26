import React,{useState, useRef, useEffect} from 'react'
import './Tutor.css'
import Courses from '../../components/tutorpage/courses/Courses'
import Students from '../../components/tutorpage/students/Students'
import { AvatarIcon, ArchiveIcon, QuestionMarkCircledIcon, RowsIcon, 
        SunIcon, MoonIcon } from "@radix-ui/react-icons"
import { LogoutUser } from '../../apicalls/user';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../../store/toastSlice';
import { clearUser } from '../../store/userSlice';
import { useNavigate } from 'react-router';

const Tutor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.id);

  // Data
  const menu = [
    ['Courses',<ArchiveIcon />],
    ['Students',<AvatarIcon />],
    ['Queires',<QuestionMarkCircledIcon />]
  ];

  // Local State
  const [lightMode , setLightMode] = useState(true);
  const [ showUserMenu, setShowUserMenu ] = useState(false);
  const usermenuRef = useRef(null);
  const [selectedMenu, setSelectedMenu] = useState('Courses');

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
              dispatch(clearUser());
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

  useEffect(()=>{
    if(!userId){
      setTimeout(() => {
        navigate('/');
      }, 500);
    }
  },[userId]);

  return (
    <div className="admin-container">
      <div className="admin-grid">
        <div className="sidebar">
          <div className="avatar">
            <AvatarIcon />
            <p>LMS Tutor</p>
          </div>
          {menu.map((items,index)=> {
            return (
              <div key= {index} className='menu-icon' onClick={()=>{setSelectedMenu(items[0])}}>
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
            <span className="corner top-left"></span>
            <span className="corner top-right"></span>
            <span className="corner bottom-left"></span>
            <span className="corner bottom-right"></span>
            {selectedMenu === 'Students' && <Students />}
            {selectedMenu === 'Courses' && <Courses />}
            {selectedMenu === 'Queries' && <Queries />}
          </div>
      </div>
    </div>
  )
}

export default Tutor