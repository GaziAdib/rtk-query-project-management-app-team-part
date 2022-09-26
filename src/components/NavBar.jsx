import React from 'react'
import LogoImage from '../assets/images/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import { userLoggedOut } from '../features/auth/authSlice';
import SearchBox from './SearchBox';

const NavBar = () => {

    const location = useLocation();

   const dispatch = useDispatch();

   const { user } = useSelector(state => state.auth) || {};
   
   const {avatar, name} = user || {};

   const logout = () => {
        dispatch(userLoggedOut());
        localStorage.clear();
   }



  return (
    <div
        className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75"
            >
                <img src={LogoImage} className="h-10 w-10" />
                <div className="ml-10">
                    <Link
                        className="mx-2 text-sm font-semibold text-indigo-700"
                        to="/projects"
                        >Projects</Link>
                  
                    <Link
                        className="mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700"
                        to="/teams">
                        Teams</Link>
                    
                </div>

                {/* search bar For Projects Page only */}

               {
                location.pathname == '/projects' ? (<div
                    className="border border-slate-200 flex items-center bg-white h-10 px-5 rounded-lg text-sm ring-emerald-200"
                >
                
                
                    <SearchBox />

                    <img
                        className="inline h-4 cursor-pointer"
                        src={avatar}
                        alt="Search"
                    />
                </div>) : ''
               }


                <button
                    className="flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer"
                >
                    <img
                        src={avatar}
                        alt={name}
                    />
                </button>
                    <ul className='ml-2 pd-2'>
                        <li className="text-red">
                            <span className="cursor-pointer"
                             onClick={logout}
                            >Logout</span>
                        </li>
                    </ul>
            </div>
  )
}

export default NavBar