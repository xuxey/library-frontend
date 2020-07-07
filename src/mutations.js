import {gql} from "@apollo/client"

export const ADD_BOOK = gql`
    mutation createBook($title: String!, $author: String!, $genres: [String!]!, $published: Int!) {
        addBook(
            author: $author,
            title: $title,
            genres: $genres,
            published: $published
        ) {
            title
            author {
                name
                _id
            }
            genres
            published
        }
    }
`
export const SET_BDAY = gql`
    mutation setBday($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name
            born
        }
    }
`

export const REGISTER_USER = gql`
    mutation registerUser($username: String!, $password: String!, $favoriteGenre: String!) {
        createUser(favoriteGenre: $favoriteGenre, username: $username, password: $password) {
            username
            id
            favoriteGenre
            token
        }
    }
`
export const LOGIN_USER = gql`
    mutation loginUser($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            username
            id
            token
            favoriteGenre
        }
    }
`
