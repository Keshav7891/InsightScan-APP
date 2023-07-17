import React from "react";
import {BsFillSunFill} from 'react-icons/bs'
import Container from "../Container";
import CustomLink from "../CustomLink";
import { Link } from "react-router-dom";
import useTheme from "../../hooks/ThemeHook";

export default function Navbar() {

  const {toggleTheme} = useTheme();

  return (
    <div className="bg-secondary shadow-sm shadowgray-500">
      <Container className="p-2">
        <div className="flex justify-between items-center">
          <Link to='/'>
            <img src="./logo.png" alt="" className="h-12" />
          </Link>

          <ul className="flex items-center space-x-4">
            <li>
              <button onClick={toggleTheme} className="bg-dark-subtle dark:bg-white p-1 rounded dark:hover:bg-white hover:bg-dark-subtle transition">
                <BsFillSunFill className="text-secondary" size={24} />
              </button>
            </li>
            <li>
                <input type="text" className="border-2 border-dark-subtle p-1 rounded bg-transparent text-xl outline-none focus:border-white transition text-white" placeholder="Search..."/>
            </li>
            <li>
                <CustomLink to="/auth/signin"><p className="text-dark-subtle hover:text-white transition">Login</p></CustomLink>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}