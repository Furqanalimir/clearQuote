import React from 'react'

const Users = ({ users }) => {

  return (
    <div>
      <h1>User Profiles</h1>
      {
        users.map((user) =>
          <div className="user" key={user.age}>
            <h3 key={user._id}>{user.name.toUpperCase()}</h3>
            <p key={user.email}>{user.email}</p>
            <p key={user.gender}>{user.gender}</p>
            <p key={user.phone}>{user.phone}</p>
          </div>
        )
      }
    </div>
  )
}

export default Users;