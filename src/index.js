import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache} from '@apollo/client'
import {BrowserRouter as Router,} from "react-router-dom"
import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3';

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
            <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_CAPTCHA_SITE_KEY}>
                <App/>
            </GoogleReCaptchaProvider>
        </Router>
    </ApolloProvider>,
    document.getElementById('root')
)
