import React from 'react'
import {Link} from "react-router-dom"


const ProjectItem = ({project, deleteProject}) => {
    return (
        <tbody>
            <tr>
                <td>
                    {project.id}
                </td>
                <td>
                    {project.name}
                </td>
                <td>
                    {project.user_access}
                </td>
                <td><button onClick={()=>deleteProject(project.id)} type='button'>Delete</button></td>
            </tr>
        </tbody>
    )
}

const ProjectList = ({projects, deleteProject}) => {
    return (
        <div>
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
                    user_access
                </th>
                <th></th>
              </tr>
            </thead>
            {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
        </table>
        <Link to='/projects/create'>Create</Link>
        </div>
    )
}


export default ProjectList