import React from 'react';
import './App.css';
import {Route, Link, BrowserRouter, Routes, Navigate} from 'react-router-dom'

import UserList from './components/user.js';
import ProjectList from './components/project.js';
import UserProjectList from './components/userProjects.js';
import axios from 'axios'
import LoginForm from './components/auth.js'
import Cookies from 'universal-cookie';



class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'token': ''
        }
    }

    set_token(token) {
            const cookies = new Cookies()
            cookies.set('token', token)
            this.setState({'token': token}, ()=>this.load_data())
        }

    is_authenticated() {
            return this.state.token !== ''
        }

    logout() {
            this.set_token('')
        }


    get_token_from_storage() {
            const cookies = new Cookies()
            const token = cookies.get('token')
            this.setState({'token': token}, ()=>this.load_data())
        }



    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
            .then(response => {
                this.set_token(response.data['token'])
            }).catch(error => alert('Неверный логин или пароль'))
        }

     get_headers() {
            let headers = {
                'Content-Type': 'application/json'
                }
            if (this.is_authenticated())
                {
                    headers['Authorization'] = 'Token ' + this.state.token
                }
            return headers
        }

    load_data() {

        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users/', {headers})
            .then(response => {
                const users = response.data
                    this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                this.setState({projects: response.data})

            }).catch(error => {
                console.log(error)
                this.setState({projects: []})
                })
        }

    componentDidMount() {
            this.get_token_from_storage()
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
                                <li>
                                    {this.is_authenticated() ?
                                        <button onClick={()=> this.logout()}>Logout</button> :
                                        <Link to='/login'>Login</Link>}
                                </li>
                            </ul>
                        </nav>
                    <Routes>

                        <Route exact path='/' element={ <UserList users={this.state.users} />} />
                        <Route exact path='/projects' element={ <ProjectList projects={this.state.projects} />} />
                        <Route path="/users" element={<Navigate replace to="/" />} />
                        <Route exact path='/login' element={<LoginForm
                            get_token={(username, password) => this.get_token(username, password)} />} />
                        <Route path="/user/:id" element={<UserProjectList projects={this.state.projects} />} />
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;