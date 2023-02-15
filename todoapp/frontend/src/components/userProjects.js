import React from 'react'
import {useParams} from "react-router-dom"


const ProjectItem = ({project}) => {
    return (
        <tbody>
            <tr>
                <td>
                    {project.name}
                </td>
                <td>
                    {project.user_access.join("\n")}
                </td>
            </tr>
        </tbody>
    )
}

const UserProjectList = ({projects}) => {

    let { id } = useParams();
    let filtered_users = projects.filter((project) =>
            project.user_access.includes(String("http://127.0.0.1:8000/api/users/"+id+"/")))
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        user_access
                    </th>
                    <th>
                        name
                    </th>
                </tr>
            </thead>
            {filtered_users.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}


export default UserProjectList