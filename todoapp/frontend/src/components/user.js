import React from 'react'


const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                {user.name}
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