import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache, ApolloLink} from '@apollo/client'
import {BrowserRouter as Router,} from "react-router-dom"
require('dotenv').config()

const httpLink = new HttpLink({uri: process.env.REACT_APP_API_LINK})
const authLink = new ApolloLink((operation, forward) => {
    const user = JSON.parse(localStorage.getItem('libraryUser'));
    if (!user) return forward(operation)
    const token = user.token
    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : ''
        }
    });
    return forward(operation);
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    connectToDevTools: true,
    link: authLink.concat(httpLink),
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <Router>
            <App/>
        </Router>
    </ApolloProvider>,
    document.getElementById('root')
)
