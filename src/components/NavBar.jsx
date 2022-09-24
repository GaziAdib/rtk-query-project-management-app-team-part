import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLoggedOut } from '../features/auth/authSlice';

const NavBar = () => {

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
                <img src="./images/logo.png" className="h-10 w-10" />
                <div className="ml-10">
                    <a
                        className="mx-2 text-sm font-semibold text-indigo-700"
                        href="projects.html"
                        >Projects</a>
                  
                    <a
                        className="mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700"
                        href="teams.html">
                        Teams</a>
                    
                </div>
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