import React from 'react'
import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { apiSlice } from '../../features/api/apiSlice';
import { useGetProjectsQuery, useUpdateProjectStageMutation } from '../../features/projects/projectsAPI';
import ProjectCard from '../ProjectCard';
import ProjectModal from '../ProjectModal';

const BackLog = () => {

    const { data: backlogProjects } = useGetProjectsQuery();

    const [updateProjectStage] = useUpdateProjectStageMutation();

    const { search } = useSelector(state => state.projects)

    const [opened, setOpened] = useState(false);

    const dispatch = useDispatch();
   
    const controlModal = () => {
        setOpened((prevState) => !prevState)
    }

       // DND DROP

       const [{ isOver }, drop] = useDrop(() =>({
        accept:"PROJECT_MOVE",
        drop: (item, monitor) => ready(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        })
    }));


    // update cache draft

    const ready = (id) => {
        dispatch(
            apiSlice.util.updateQueryData(
                        "getProjects",
                        undefined,
                        (draft) => {
                            const project = draft?.find((project) => project.id === id);
                            project.stage = "backlog";
                        })
                );
            
         // update the api 
         updateProjectStage({
            id,
            stage: "backlog"
         })
         // do api update
    } 

  return (
    <div className="flex flex-col flex-shrink-0 w-72 h-screen">
         <div className="flex items-center flex-shrink-0 h-10 px-2">
                        <span className="block text-sm font-semibold">Backlog</span>
                        <span
                            className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30"
                            >{backlogProjects?.length}</span>
                        
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


        <div ref={drop} className="flex flex-col pb-2 overflow-auto">
            {
            

                backlogProjects?.length > 0 && search !== '' ? (

                    backlogProjects?.filter((f) => f.title.toLowerCase().includes(search)).map((project) => {
                        return <ProjectCard project={project} key={project.id}/>
                    })

                ) : (
                     backlogProjects?.length > 0 && backlogProjects?.filter((f) => f.stage === 'backlog').map((project) => {
                        return <ProjectCard project={project} key={project.id} />
                    })
                )
  
                
            }
            
        </div>
    </div>
  )
}

export default BackLog