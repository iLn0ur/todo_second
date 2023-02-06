import React from 'react';
import './App.css';
import {Route, Link, BrowserRouter, Routes, Navigate} from 'react-router-dom'

import UserList from './components/user.js';
import ProjectList from './components/project.js';
import UserProjectList from './components/userProjects.js';
import axios from 'axios'




class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const users = response.data
                    this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/')
            .then(response => {
                const projects = response.data
                    this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))
    }

    render () {
        return (
            <div className='App'>
                <BrowserRouter>
                    <nav>
                            <ul>
                                <li>
                                    <Link to='/'>users</Link>
                                </li>
                                <li>
                                    <Link to='/projects'>projects</Link>
                                </li>
                            </ul>
                        </nav>
                    <Routes>

                        <Route exact path='/' element={ <UserList users={this.state.users} />} />
                        <Route exact path='/projects' element={<ProjectList projects={this.state.projects} />} />
                        <Route path="/users" element={<Navigate replace to="/" />} />
                        <Route path="/user/:id" element={<UserProjectList projects={this.state.projects} />} />
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;