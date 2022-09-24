import { useState } from "react";
import { useSelector } from "react-redux";
import { useAddTeamMutation } from "../features/teams/teamsAPI";
import { useGetUsersQuery } from "../features/users/usersAPI";
import isValidateEmail from "../utils/isValidEmail";
import Error from "./Error";

export default function Modal({ open, control }) {

    const [addTeam, {data, isSuccess: isAddTeamSuccess, error: responseError}] = useAddTeamMutation()

    // get auth user id for who is created that 

    const { user: authUser } = useSelector(state => state.auth) || {};

    // console.log(authUser)

    const {data: users, isLoading } = useGetUsersQuery();

    // console.log(users);

    
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState('');
    const [error, setError] = useState("");
    

    
   const  handleSubmit = (e) => {
        e.preventDefault();

        setError('')
            // add Team
            if(authUser) {
                addTeam({
                    admin: authUser?.email,
                    category,
                    description,
                    color,
                    date: new Date().getTime(),
                    members: [authUser?.email]
                });
                if(isAddTeamSuccess) {
                    setColor('');
                    setCategory('')
                    setDescription('');
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
                        Add Team
                    </h2>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        {/* <input type="hidden" name="remember" value="true" /> */}
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="to" className="sr-only">
                                    Category
                                </label>
                                <input
                                    id="category"
                                    name="category"
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Team Category"
                                    onChange={(e) => setCategory(e.target.value)}
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
                                    placeholder="Team Description"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="to" className="sr-only">
                                    Team Color
                                </label>
                                <input
                                    id="color"
                                    name="color"
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Team Color (green, blue, yellow, purple etc)"
                                    onChange={(e) => setColor(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                            >
                                Create Team
                            </button>
                        </div>


                        {/* {participant?.length === 0 && <Error message="This user does not exist" />} */}
                        

                        {/* {participant?.length > 0 && participant[0].email === myEmail && <Error message="You can not send message to yourself!" />} */}

                        {responseError && <Error message={responseError} />}
                    </form>
                
                </div>
            </>
        )
    );
}