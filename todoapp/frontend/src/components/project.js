import React from 'react'
import {Link} from "react-router-dom"


const ProjectItem = ({project}) => {
    return (
        <tbody>
            <tr>
                <td>
                    {project.name}
                </td>
                <td>
                    {project.user_access}
                </td>
            </tr>
        </tbody>
    )
}

const ProjectList = ({projects}) => {
    return (
        <table>
            <thead>
              <tr>
                <th>
                    name
                </th>
                <th>
                    user_access
                </th>
              </tr>
            </thead>
            {projects.map((project) => <ProjectItem project={project} />)}
        </table>

    )
}


export default ProjectList