import React from 'react'
import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { apiSlice } from '../../features/api/apiSlice';
import { useGetProjectsQuery, useUpdateProjectStageMutation } from '../../features/projects/projectsAPI'
import { checkLengthStage } from '../../utils/lengthCheckStageCount';
import Error from '../Error';
import ProjectCard from '../ProjectCard';
import ProjectModal from '../ProjectModal';

const BackLog = () => {

    const { data: allProjects, isLoading, isError, isSuccess, error } = useGetProjectsQuery();

    const [updateProjectStage] = useUpdateProjectStageMutation();

    const dispatch = useDispatch();

    const [opened, setOpened] = useState(false);

   
   
    const controlModal = () => {
        setOpened((prevState) => !prevState)
    }

    
    // decide what to render
    let content = '';

    if(isLoading) {
        content = <li className="m-2 text-center">Loading...</li>
    }

    if(!isLoading && isError) {
        content = <li className="m-2 text-center"><Error message={error?.data}/></li>
    } else if(!isLoading && !isError && allProjects?.length === 0) {
        content = <li className="m-2 text-center">No Projects found!</li>
    } else if(!isLoading && !isError && allProjects?.length > 0) {
        content = allProjects.filter((f) => f.stage === 'backlog').map((project) => {
            return <ProjectCard project={project} key={project.id} />
        })
    }


    // DND DROP

    const [{ isOver }, drop] = useDrop(() =>({
        accept:"PROJECT_STAGE_CHANGED",
        drop: (item, monitor) => moveItem(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        })
    }));


    // update cache draft

    const moveItem = (id) => {
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
        
    }  
    
    const countProjects = checkLengthStage(allProjects, 'backlog');



  return (
    <div className="flex flex-col flex-shrink-0 w-72">
        <div className="flex items-center flex-shrink-0 h-10 px-2">
            <span className="block text-sm font-semibold">Backlog</span>
                <span
                     className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30"
                    >{countProjects}
                </span>

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

        <div ref={drop} className="flex flex-col pb-2 overflow-auto h-screen">
           {content}
        </div>
    </div>
  )
}

export default BackLog;