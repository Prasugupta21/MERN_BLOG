import { useEffect, useState } from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import { FaCartPlus } from "react-icons/fa";
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { signoutSuccess } from '../redux/slices/userSlice';
import { RxCross1 } from "react-icons/rx";
import clsx from "clsx";
import Avatar from 'react-avatar';
  










const Header = () => {
  
const dispatch=useDispatch();
  const [st, setState] = useState(false);
  const {currUser}=useSelector((state)=>state.user )
  const [open,setOpen]=useState(false);
  const navigate=useNavigate();
 
useEffect(()=>{
  if(!currUser){navigate('/login');}
  
    
},[currUser])

  const list = [
    { title: "Collection" },
    { title: "men" },
    { title: "About" },
    { title: "Contact" },
  ];

  const toggleDropdown=()=>{
setOpen(!open)
  }

  const handleLogOut=async()=>{
    try {
     const data= await axios.post('/logout');
     console.log(data);
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
    <>
      <header>
        <div className="w-screen border-b-2 flex justify-between p-2 ">
          <div className="flex justify-center items-center space-x-4 lg:p-3 ">
            <GiHamburgerMenu
              id="hamburger"
              onClick={() => {
                setState(true);
              }}
              className="text-2xl lg:hidden"
            />
            <p className="text-xl font-semibold font-mono">logo</p>
            <div className="hidden lg:block">
              <ul className="ml-10 flex justify-around space-x-11 font-serif hover:text-black">
                {list.map((elem, i) => {
                  const { title } = elem; //destructed in react //
                  return (
                    <li key={i} className="text-lg text-gray-500">
                      {title}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div
            id="mobile-navbar"
            className={clsx(
              "fixed top-0 left-0 w-screen h-full bg-black/20 backdrop-blur-sm -translate-x-full",
              st && "translate-x-0" //toggle on true//
            )}
          >
            <div className="bg-white w-3/5 h-full p-7 ">
              <RxCross1
                id="Cross-icon"
                onClick={() => {
                  setState(false);
                }}
                className="text-2xl mb-5 cursor-pointer "
              />
              <ul className="space-y-4 font-serif">
                {list.map((elem, i) => {
                  const { title } = elem; //destructed in react //
                  return (
                    <li key={i} className="text-lg font-bold">
                      {title}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="flex justify-center items-center space-x-4 lg:space-x-10 ">
          <FaCartPlus className="text-2xl" />
          
                
          <div className="relative inline-block text-left">
      <Avatar
        onClick={toggleDropdown}
        className="cursor-pointer mr-3 md:mr-6"
        round={true}
        src={currUser?.user?.profilePicture}
        size="40"
      />
      {open && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-2">
            <p className="block px-4 py-2 text-sm text-gray-700">{currUser?.user?.name}</p>
            
              <Link to={`/update/${currUser?.user?._id}`}>
              <button className="block text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">

               Profile
               </button></Link>
       
            <button
              
             onClick={handleLogOut} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
             
         
           
          
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;