import React from 'react'
import moment from 'moment';
import { useDeleteProjectMutation } from '../features/projects/projectsAPI';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';

const ProjectCard = ({ project }) => {

  const {id, title, description, color, stage, date, team, author} = project || {};

  // search data from useSelector
  const { search: searchedData } = useSelector(state => state.projects);

  // delete mutation
  const [deleteProject] = useDeleteProjectMutation({id: id, author: author.email});

  // get auth user
  const {user: authUser} = useSelector(state => state.auth) || {};

    // Delete a project by author only
  const deleteProjectHandler = () => {
    if(authUser?.email === author?.email) {
        deleteProject({ id, author: authUser.email })
    }
  }


  // DND Dragging feature

  const [{ isDragging, opacity }, drag] = useDrag({
        type: "PROJECT_STAGE_CHANGED",
        item: {id},
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
        }),
  });
  
  
  const isSelected = title.toLowerCase().includes(searchedData.toLowerCase());



  return (
       <>
     
        <div
            ref={drag}
            style={{ opacity }}
             className={`${searchedData !== '' && isSelected && "border-dashed border-4"} shadow-lg border-sky-500 relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100`}
             draggable="true"
        >
    
            {stage === 'backlog' && <button
                className="absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"
                >
                    <svg
                        className="w-4 h-4 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
                        />
                    </svg>
                </button>
            }
    

            <span
                className={`flex items-center h-6 px-3 text-xs font-semibold text-${color}-500 bg-${color}-100 rounded-full`}
                >{team}
            </span>

    
            <h4 className="mt-3 text-sm font-medium">
                { title.length > 100 ? (title.substr(0,100)+'...') : title }
            </h4>
            <div
                className="flex items-center w-full mt-3 text-xs font-medium text-gray-400"
            >
                <div className="flex items-center">
                    <svg
                        className="w-4 h-4 text-gray-300 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span className="ml-1 leading-none"
                        >{moment(date).fromNow()}</span>
                    
                </div>
    
                <img
                    className="w-6 h-6 ml-auto rounded-full"
                    src={author?.avatar}
                />
    
             {/* Delete Button */}
              <div className="rounded">
    
                {stage === 'backlog' && author?.email === authUser.email && <span className="ml-auto p-1 text-red-600"><button onClick={deleteProjectHandler} className="rounded ml-auto hover:bg-red-200 p-1">delete</button></span>}
    
              </div>
    
             </div>
        </div>
           
    

    </>
       
  )
}

export default ProjectCard