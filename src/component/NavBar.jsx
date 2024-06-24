import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DiBitbucket } from 'react-icons/di';
import { FaAlignJustify } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";


export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-blue-600 p-4 max-w-screen-2xl container mx-auto xl:px-24">
      <nav className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-white text-2xl font-bold flex items-center">
          <DiBitbucket className="mr-2" />
          HOME
        </NavLink>
        <div className="hidden md:flex space-x-4">
          <NavLink to="/survey" activeClassName="text-blue-400" className="text-white">
            Survey-form
          </NavLink>
          <div className='text-base text-pirmary font-medium space-x-5 hidden lg:block'>
            <NavLink to="/login" activeClassName="text-blue-400 " className="py-2 px-5 border rounded  bg-blue text-wht">
              Login
            </NavLink>
            <NavLink to="/signup" activeClassName="text-blue-400" className="py-2 px-5 border rounded bg-blue text-wht">
              Signup
            </NavLink>
          </div>
        </div>
        <button
          className="md:hidden text-white"
          onClick={handleMenuToggler}
        >
          {isMenuOpen ? <AiOutlineClose /> : <FaAlignJustify />}
        </button>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden flex flex-col space-y-2 p-4 bg-black">
          <NavLink to="/" exact activeClassName="text-blue-400" className="text-white flex item-center gap-2 text-2xl" onClick={handleMenuToggler}>
           Home
          </NavLink>
          <NavLink to="/survey" activeClassName="text-blue-400" className="flex item-center gap-2 text-2xl text-white" onClick={handleMenuToggler}>
            Survey-Form
          </NavLink>
          
          
          <div className='text-white text-pirmary font-medium space-x-5 lg:block'>
            <NavLink to="/login" activeClassName="text-blue-400" className="py-2 px-5 bg-blue border text-wht rounded">
              Login
            </NavLink>
            <NavLink to="/signup" activeClassName="text-blue-400" className="py-2 px-5 border rounded bg-blue text-wht">
              Signup
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
