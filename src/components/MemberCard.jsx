import React from 'react'

const MemberCard = ({ member, color }) => {

const {id, name, email, avatar } = member || {};

  return (
   

    <div className={`shadow-sm hover:bg-${color}-100 flex rounded-md pl-1 mr-auto pr-1`}>
    <img src={avatar} className="rounded m-1" height="25px" width="25px"/>
        <div className="m-1 p-1 text-sm">
            <strong>({name})</strong>
        </div>
    </div>
   
  )
}

export default MemberCard