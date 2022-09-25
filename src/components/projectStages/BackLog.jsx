import React from 'react'
import { useState } from 'react';
import { useGetProjectsQuery } from '../../features/projects/projectsAPI';
import ProjectCard from '../ProjectCard';
import ProjectModal from '../ProjectModal';

const BackLog = () => {

    const { data: backlogProjects } = useGetProjectsQuery();

    const [opened, setOpened] = useState(false);
   
    const controlModal = () => {
        setOpened((prevState) => !prevState)
    }

  return (
    <div className="flex flex-col flex-shrink-0 w-72">
         <div className="flex items-center flex-shrink-0 h-10 px-2">
                        <span className="block text-sm font-semibold">Backlog</span>
                        <span
                            className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30"
                            >6</span>
                        
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


            

           <ProjectModal control={controlModal} open={opened} />


        <div className="flex flex-col pb-2 overflow-auto">
            {
            
                backlogProjects?.length > 0 && backlogProjects?.filter((f) => f.stage === 'backlog').map((project) => {
                    return <ProjectCard project={project} key={project.id}/>
                })

            }
        </div>
    </div>
  )
}

export default BackLog