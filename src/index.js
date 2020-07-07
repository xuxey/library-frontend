import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache, ApolloLink, split} from '@apollo/client'
import {BrowserRouter as Router,} from "react-router-dom"
import {getMainDefinition} from '@apollo/client/utilities'
import {WebSocketLink} from '@apollo/link-ws'
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
const wsLink = new WebSocketLink({
    uri: process.env.REACT_APP_WEBSOCKET_LINK,
    options: {
        reconnect: true
    }
})
const splitLink = split(
    ({query}) => {
        const definition = getMainDefinition(query)
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    authLink.concat(httpLink),
)
const client = new ApolloClient({
    cache: new InMemoryCache(),
    connectToDevTools: true,
    link: splitLink,
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <Router>
            <App/>
        </Router>
    </ApolloProvider>,
    document.getElementById('root')
)
