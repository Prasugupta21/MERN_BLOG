import { GiHamburgerMenu } from "react-icons/gi";
import { FaCartPlus } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import Avatar from 'react-avatar';

import clsx from "clsx";
import DropdownMenu from "./DropdownMenu";



const Header = () => {
  const [st, setState] = useState(false);
  const {currUser}=useSelector((state)=>state.user )
  const [open,setOpen]=useState(false);
  const state=useSelector((state)=>state)
useEffect(()=>{
  if(currUser)console.log('yes')
  
    else console.log('no')
},[])
const state2=useSelector((state)=>state)
  const list = [
    { title: "Collection" },
    { title: "men" },
    { title: "About" },
    { title: "Contact" },
  ];

  const toggleDropdown=()=>{
setOpen(!open)
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
          
                
          <DropdownMenu currUser={currUser}  />
             
         
           
          
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;