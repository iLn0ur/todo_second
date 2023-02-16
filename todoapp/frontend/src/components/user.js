import React from 'react'
import {Link}from 'react-router-dom'


const UserItem = ({user}) => {
    return (
        <tbody>
            <tr>
                <td>
                    {user.id}
                </td>
                <td>
                    {user.name}
                </td>
                <td>
                    {user.birthday_year}
                </td>
            </tr>
        </tbody>
    )
}

const UserList = ({users}) => {
    return (
        <table>
            <thead>
             <tr>
                <th>
                    ID
                </th>
                <th>
                    name
                </th>
                <th>
                    birthday_year
                </th>
              </tr>
            </thead>
            {users.map((user) => <UserItem user={user} />)}
        </table>
    )
}


export default UserList