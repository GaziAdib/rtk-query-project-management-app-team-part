import React from 'react'
import { useState } from 'react';
import { useAddProjectMutation } from '../features/projects/projectsAPI';
import Error from './Error';
import Select from 'react-select';
import { useGetTeamsQuery } from '../features/teams/teamsAPI';
import { useSelector } from 'react-redux';

const ProjectModal = ({control, open}) => {

    const [addProject, {data, isSuccess: isAddProjectSuccess, error: responseError}] = useAddProjectMutation();

    // get Team Data fro project Modal

    const { data: teams, isError, isLoading, isSuccess } = useGetTeamsQuery();

    // get auth User Info 

    const { user } = useSelector(state => state.auth) || {};
    

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("");
    const [selectedTeam, setSelectedTeam] = useState("");
    const [error, setError] = useState("");

     // selected options show to select 
    //  const option =  teams?.map((t) => {
    //     return {label: t.category, value: t.category, color: t.color}
    // })

    const option =  teams?.map((t) => {
        return {label: t.category, value: t}
    })

   // console.log(option)

    // console.log(selectedTeam);



    const handleProjectSubmit = (e) => {
        e.preventDefault();

        setError('');

        if(user) {
            addProject({
                stage: 'backlog',
                author: user,
                title: title,
                description: description,
                team: selectedTeam?.category,
                color: selectedTeam?.color,
                date: new Date().getTime()
            });
            if(isSuccess) {
                setTitle('');
                setDescription('');
                //setColor('');
                setSelectedTeam('');
            }
        }
       
    }

  return (
    open && (
        <>
            <div
                onClick={control}
                className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
            ></div>
            <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Add Project
                </h2>

                <form onSubmit={handleProjectSubmit} className="mt-8 space-y-6 mt-1 mb-1">
                    <div className="rounded-md shadow-sm -space-y-px m-1 mt-1 mb-1">
                        <div>
                            <label htmlFor="to" className="sr-only">
                                Title
                            </label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                placeholder="Project Title"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="to" className="sr-only">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                placeholder="Project Description"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="to" className="sr-only">
                                Project Team
                            </label>
                            
                            <div className="w-12/12 ml-auto">   
                                <Select className="w-12/12" placeholder="Select Team"  onChange={(e) => setSelectedTeam(e.value)} options={option} />    
                            </div>
                        </div>

                        {/* <div>
                            <label htmlFor="to" className="sr-only">
                                Project Color
                            </label>
                            <input
                                id="color"
                                name="color"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                placeholder="Project Color (green, blue, yellow, purple etc)"
                                onChange={(e) => setColor(e.target.value)}
                            />
                        </div> */}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                        >
                            Create Project
                        </button>
                    </div>

                    {responseError && <Error message={responseError} />}
                </form>
            
            </div>
        </>
    )
  )
}

export default ProjectModal