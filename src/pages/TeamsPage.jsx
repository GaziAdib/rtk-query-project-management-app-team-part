import React from 'react'
import { useState } from 'react'
import NavBar from '../components/NavBar'
import Team from '../components/Team'
import Modal from '../components/Modal'
import { useGetTeamsQuery } from '../features/teams/teamsAPI'
import Error from '../components/Error'
import { useSelector } from 'react-redux'

const TeamsPage = () => {
    
    const {data: teams, error, isLoading, isError} = useGetTeamsQuery();


    const {user: authUser} = useSelector(state => state.auth)


    const [opened, setOpened] = useState(false);

    const controlModal = () => {
        setOpened((prevState) => !prevState)
    }

    let content = '';

    if(isLoading) {
        content = <li className="m-2 text-center">Loading...</li>
    }

    if(!isLoading && isError) {
        content = <li className="m-2 text-center"><Error message={error?.data}/></li>
    } else if(!isLoading && !isError && teams?.length === 0) {
        content = <li className="m-2 text-center">No TeamsFound!</li>
    } else if(!isLoading && !isError && teams?.length > 0) {
        content = teams.filter((team) => team.members.includes(authUser.email)).map((team) => {
            return <Team team={team} key={team.id} />
        })
    }

   // filter((team) => team.members.includes(authUser.email))

  return (
    <div
        className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200"
        >

            <NavBar />

            <div className="px-10 mt-6 flex justify-between">
                <h1 className="text-2xl font-bold">Teams</h1>
                <button
                onClick={controlModal}
                    className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
                    </svg>
                </button>
            </div>

            {/* // modal */}

            <Modal open={opened} control={controlModal} />

            <div
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6"
            >
                
               {/* <Team /> */}
               {content}

                
            </div>
        </div>
  )
}

export default TeamsPage