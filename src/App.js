import React, {useEffect, useState} from 'react'
import Books from './components/books/Books'
import NewBook from './components/books/NewBook'
import Notification from "./components/Notification";
import LoginForm from "./components/login/LoginForm";
import NavMenu from "./components/NavMenu";
import Logout from "./components/login/Logout";
import {Redirect, Route, Switch} from "react-router-dom"
import './App.css'
import RegisterForm from "./components/login/RegisterForm";
import BookView from "./components/books/BookView";
import {Container} from "react-bootstrap";
import UserDashboard from "./components/UserDashboard";
import Wishlist from "./components/books/Wishlist";
import Activity from "./components/books/Activity";

const App = () => {
    const [message, setMessage] = useState(null)
    const [user, setUser] = useState(null)
    const [timeoutId, setTimeoutId] = useState(null)
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('libraryUser')
        if (loggedUserJSON)
            setUser(JSON.parse(loggedUserJSON))
    }, [])
    const showMessage = (message, isError) => {
        if(timeoutId) clearTimeout(timeoutId)
        setMessage({text: message, error: isError})
        const id = setTimeout(() => setMessage(null), 5000)
        setTimeoutId(id)
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
                <Route path="/books/new">
                    {   user&&user.username==='admin' ?
                        <>
                            <h2>Add New Book</h2>
                            <hr/>
                            <NewBook showMessage={showMessage} user={user}/>
                        </> :
                        <Redirect to="/books"/>
                    }
                </Route>
                <Route path="/books/:id">
                    <BookView user={user} showMessage={showMessage}/>
                </Route>
                <Route path="/books">
                    <h2>Catalog</h2>
                    <hr/>
                    <Books/>
                </Route>
                <Route path="/dashboard">
                    {
                        user ? <>
                            <h2>Dashboard - {user.username}</h2>
                            <hr/>
                            <UserDashboard/>
                            </>:
                        <Redirect to="/books"/>
                    }
                </Route>
                <Route path="/logout">
                    <h2>Log Out</h2>
                    <hr/>
                    <Logout setUser={setUser} showMessage={showMessage}/>
                </Route>
                <Route path="/activity">
                    {   user&&user.username==='admin' ?
                        <>
                            <h2>Activity</h2>
                            <hr/>
                            <Activity/>
                </> :
                <Redirect to="/books"/>
                }
                </Route>
                <Route path="/wishlist">
                    <h2>Wishlist</h2>
                    <hr/>
                    <Wishlist/>
                </Route>
                {/*<Route path="/recommended">
                    <h2>Recommended</h2>
                    <hr/>
                    <Recommended user={user}/>
                </Route>*/}
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
