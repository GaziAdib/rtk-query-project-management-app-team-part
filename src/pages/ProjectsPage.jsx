import React from 'react'
import NavBar from '../components/NavBar'
import BackLog from '../components/projectStages/BackLog'
import Blocked from '../components/projectStages/Blocked'
import Doing from '../components/projectStages/Doing'
import Done from '../components/projectStages/Done'
import Ready from '../components/projectStages/Ready'
import Review from '../components/projectStages/Review'

const ProjectsPage = () => {
  return (
        <div
        className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200"
    >
      
        <NavBar />

        <div className="px-10 mt-6">
            <h1 className="text-2xl font-bold">Project Board</h1>
        </div>

        <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
            <BackLog />
            <Blocked />
            <Doing />
            <Done />
            <Ready />
            <Review />
        </div>
        
    </div>
  )
}

export default ProjectsPage