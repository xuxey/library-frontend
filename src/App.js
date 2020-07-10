import React, {useEffect, useState} from 'react'
import Authors from './components/books/Authors'
import Books from './components/books/Books'
import NewBook from './components/books/NewBook'
import Notification from "./components/Notification";
import LoginForm from "./components/login/LoginForm";
import NavMenu from "./components/NavMenu";
import Logout from "./components/login/Logout";
import {Redirect, Route, Switch} from "react-router-dom"
import './App.css'
import Recommended from "./components/books/Recommended";
import RegisterForm from "./components/login/RegisterForm";
import BookView from "./components/books/BookView";
import {Container} from "react-bootstrap";

const App = () => {
    const [message, setMessage] = useState(null)
    const [user, setUser] = useState(null)
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('libraryUser')
        if (loggedUserJSON)
            setUser(JSON.parse(loggedUserJSON))
    }, [])
    const showMessage = (message, isError) => {
        setMessage({text: message, error: isError})
        setTimeout(() => setMessage(null), 5000)
    }
    return (
        <Container>
            <NavMenu user={user}/>
            <Notification message={message}/>
            <Switch>
                <Route path="/login">
                    <h2>Login</h2>
                    <hr/>
                    {
                        user ? <Redirect to="/books"/> :
                        <LoginForm setMessage={showMessage} setUser={setUser}/>
                    }
                </Route>
                <Route path="/authors">
                    <h2>Authors</h2>
                    <hr/>
                    <Authors
                        setMessage={showMessage}
                        user={user}
                    />
                </Route>
                <Route path="/books/new">
                    <h2>Add New Book</h2>
                    <hr/>
                    <NewBook showMessage={showMessage} user={user}/>
                </Route>
                <Route path="/books/:id">
                    <BookView user={user} showMessage={showMessage}/>
                </Route>
                <Route path="/books">
                    <h2>Books</h2>
                    <hr/>
                    <Books/>
                </Route>
                <Route path="/logout">
                    <h2>Log Out</h2>
                    <hr/>
                    <Logout setUser={setUser} showMessage={showMessage}/>
                </Route>
                <Route path="/recommended">
                    <h2>Recommended</h2>
                    <hr/>
                    <Recommended user={user}/>
                </Route>
                <Route path="/register">
                    <h2>Register</h2>
                    <hr/>
                    {user?
                        <Redirect to="/books"/> :
                        <RegisterForm setUser={setUser} setMessage={showMessage}/>
                    }
                </Route>
                <Route path="/">
                    <h2>Books</h2>
                    <hr/>
                    <Redirect to="/books"/>
                </Route>
            </Switch>
        </Container>
    )
}

export default App
