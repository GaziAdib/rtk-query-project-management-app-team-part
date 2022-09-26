import React, { useEffect } from 'react'
import moment from 'moment';
import { useState } from 'react';
import { useAddMemberInTeamMutation, useDeleteTeamMutation, useGetTeamQuery, useGetTeamsQuery } from '../features/teams/teamsAPI';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { useGetUsersQuery } from '../features/users/usersAPI';
import MembersIcon from '../assets/images/members_icon.png'
import MemberCard from './MemberCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Team = ({ team }) => {

    const { id, color, category, description, date, admin, members } = team || {};

    const [selectedUser, setSelectedUser] = useState('');

    const [showMemberInfoModal, setShowMemberInfoModal] = useState(false);
    const [membersInfoBox, setMembersInfoBox] = useState([]);
    

    // DELETE MUTATION
    const [deleteTeam] = useDeleteTeamMutation({id, admin});

     // GET TEAM QUERY

    const {data: users} = useGetUsersQuery();

    // ADD MEMBER MUTATION
    const [addMemberInTeam, {data, isSuccess}] = useAddMemberInTeamMutation({id, member:selectedUser.email, members});
    

  
    // GET USER FROM AUTH STATE
    const { user }  = useSelector(state => state.auth);

    // BUTTON CLIck EVENTS CHECK
    const [buttonClicked, setButtonClicked] = useState(false);

    const handleMenuButton = () => {
        setButtonClicked((prev) => !prev)
        // console.log('menu button clicked!')
     }

    const getMembersNotInTeam =  users?.filter((u) => !members.some((m) => m === u.email))
  

    // Delete a Team by -- Admin
    const  deleteTeamHandler = () => {
        if(admin === user?.email) {
            deleteTeam({id, admin});
        } else {
            alert('You cannot delete it it own by others')
        }
        setButtonClicked(false);
    }


    // selected options show to select 
    const option =  getMembersNotInTeam?.map((m) => {
        return {label: m.email, value: m.email}
    })

    // Assign Members Submit handler 

    const memberAssignHandler = (e) => {
        e.preventDefault();
        addMemberInTeam({
            id,
            member: selectedUser?.email,
            members: [...members, selectedUser]
        });
        setButtonClicked(false);
    }

    // GET members info i a team
    const membersInfoInTeam = users?.filter((u) => members?.some((m) => m === u.email));
   


    // memebers Info Handler Modal
    const onMembersInfoHandler = () => {
        setMembersInfoBox(membersInfoInTeam)
        setShowMemberInfoModal((prevState) => !prevState);
    }



  return (
    <div
        className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
                draggable="true"
                > 
                
                {buttonClicked && 
                
                <div className="w-9/12 ml-auto">

                    <form onSubmit={memberAssignHandler}>
                       
                        <Select className="w-9/12"  onChange={(e) => setSelectedUser(e.value)} options={option} />

                        {selectedUser && <button className="text-green-800 bg-green-200 border-2 rounded p-1 m-2 mr-auto" type="submit">Assign Member</button>}
                        
                    </form>
                    
                </div>

                }  
                

                    <button
                    onClick={handleMenuButton}
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

                 
                    <span 
                        className={`flex items-center h-6 px-3 text-xs font-semibold text-${color}-500 bg-${color}-100 rounded-full`}
                        >{category}
                    </span>
                   
                    <h4 className="mt-3 text-sm font-medium">
                       {description}
                    </h4>

                    {members?.length > 0 &&  
                         
                        <div onClick={onMembersInfoHandler} className={`shadow-sm  hover:bg-${color}-100 flex rounded-md pl-1 mr-auto pr-1`}>
                        <img src={MembersIcon} className="rounded m-1" height="25px" width="25px"/>
                            <div className="m-1 p-1 text-sm">
                                <strong className={`hover:bg-${color}-100`}>({members.length})</strong>
                            </div>
                        </div>
                    }


                    {showMemberInfoModal && membersInfoBox?.length > 0 &&

                    
                        membersInfoBox?.map((member) => {
                            return  <MemberCard member={member} key={member.id} color={color} />
                                
                        })
                    }


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
                            <span className="ml-1 leading-none">{moment(date).fromNow()}</span>  
                        </div>


                        <div className="ml-auto">

                            {admin === user?.email && <span className="ml-auto pd-2 m-2 text-red-600"><button onClick={deleteTeamHandler} className="rounded ml-auto hover:bg-red-200 p-2">delete</button></span>}

                        </div>
                       
                </div>
    </div>
  )
}


export default Team