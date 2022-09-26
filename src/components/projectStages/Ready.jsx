import React from 'react'
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { apiSlice } from '../../features/api/apiSlice';
import { useGetProjectsQuery, useUpdateProjectStageMutation } from '../../features/projects/projectsAPI'
import Error from '../Error';
import ProjectCard from '../ProjectCard';

const Ready = () => {

    const { data: allProjects, isLoading, isError, isSuccess, error } = useGetProjectsQuery();

    const [updateProjectStage] = useUpdateProjectStageMutation();

    const dispatch = useDispatch();

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
        content = allProjects.filter((f) => f.stage === 'ready').map((project) => {
            return <ProjectCard project={project} key={project.id} />
        })
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
                            project.stage = "ready";
                        })
                );
            
         // update the api 
         updateProjectStage({
            id,
            stage: "ready"
         })
         // do api update
    }   



  return (
    <div className="flex flex-col flex-shrink-0 w-72 h-screen">
        <div className="flex items-center flex-shrink-0 h-10 px-2">
                <span className="block text-sm font-semibold">Ready</span>
                    <span
                         className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30"
                        >6
                </span>
                            
         </div>

        <div ref={drop} className="flex flex-col pb-2 overflow-auto">
           {content}
        </div>
    </div>
  )
}

export default Ready