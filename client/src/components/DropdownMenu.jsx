// DropdownMenu.jsx
import axios from 'axios';
import React, { useState } from 'react';
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { signoutSuccess } from '../redux/slices/userSlice';
const DropdownMenu = ({ currUser }) => {
  const [open, setOpen] = useState(false);
const dispatch=useDispatch();
const navigate=useNavigate();
  const toggleDropdown = () => {
    setOpen(!open);
  };

  const handleLogOut=async()=>{
    try {
     const data= await axios.post('/logout');
   if(data.status===200){
     console.log("logout completed ",data);
   dispatch(signoutSuccess());
   navigate('/login');
   
   }
   else{
     console.log('not success ')
   }
    } catch (error) {
     console.log(error);
    }
   
   
     }
   
  return (
    <div className="relative inline-block text-left">
      <Avatar
        onClick={toggleDropdown}
        className="cursor-pointer"
        round={true}
        src={currUser?.user?.profilePicture}
        size="40"
      />
      {open && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-2">
            <p className="block px-4 py-2 text-sm text-gray-700">{currUser?.user?.name}</p>
            
            <button className="block text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</button>
            <button
              
             onClick={handleLogOut} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
