import React, {useState} from 'react'
import {useMutation} from "@apollo/client";
import {LOGIN_USER} from "../../mutations";
import {Button, Col, Form} from "react-bootstrap";
import {useHistory} from "react-router-dom"

const LoginForm = ({setUser, setMessage}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory();
    const [loginUser] = useMutation(LOGIN_USER, {
            onError: error => setMessage(error.graphQLErrors[0].message, true)
        }
    )
    const onSubmit = async (event) => {
        event.preventDefault()
        if (username === '') return
        if (password === '') return
        const user = {username, password}
        let loggedInUser = await loginUser({variables: user})
        loggedInUser = loggedInUser.data.login
        console.log("LOGGED IN USER", loggedInUser)
        setUser(loggedInUser)
        window.localStorage.setItem('libraryUser', JSON.stringify(loggedInUser))
        setUsername('')
        setPassword('')
        setMessage(`Logged in as ${username}`, false)
        history.push('/books')
    }
    return (
        <Form onSubmit={onSubmit}>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control id='username' value={username} onChange={e => setUsername(e.target.value)}/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control id='password' value={password} onChange={e => setPassword(e.target.value)} type='password'/>
                </Form.Group>
            </Form.Row>
            <Button variant="primary" id="login-button" type="submit">Login</Button>
        </Form>
    )
}

export default LoginForm
