import React from "react";
import {useHistory} from "react-router-dom";
import {useApolloClient} from "@apollo/client";

const Logout = ({setUser, showMessage}) => {
    const history = useHistory()
    const client = useApolloClient()
    window.localStorage.removeItem('libraryUser')
    setUser(null)
    client.resetStore()
        .then(() => showMessage('Logged out of your account', false))
    history.push('/books')
    return <div>Logging out...</div>
}
export default Logout
