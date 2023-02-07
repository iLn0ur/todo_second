import React from 'react'
import {Link}from 'react-router-dom'


const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                {user.url}
            </td>
            <td>
                <Link to ={`user/${user.url.split('/')[5]}`}>{user.name}</Link>
            </td>
            <td>
                {user.birthday_year}
            </td>
        </tr>
    )
}

const UserList = ({users}) => {
    return (
        <table>
            <th>
                ID
            </th>
            <th>
                name
            </th>
            <th>
                birthday_year
            </th>
            {users.map((user) => <UserItem user={user} />)}
        </table>
    )
}


export default UserList