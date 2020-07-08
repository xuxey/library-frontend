import {gql} from "@apollo/client"

export const ADD_BOOK = gql`
    mutation createBook($title: String!, $author: String!, $genres: [String!]!, $price: Int!) {
        addBook(
            author: $author,
            title: $title,
            genres: $genres,
            price: $price
        ) {
            title
            author {
                name
                _id
            }
            genres
            price
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
    mutation registerUser(
        $username: String!
        $password: String!
        $apartmentWing: String!
        $apartmentNumber: Int!
        $phoneNumber: String!) {
        register(username: $username, password: $password,
            apartmentWing: $apartmentWing, apartmentNumber: $apartmentNumber,
            phoneNumber: $phoneNumber) {
            username
            token
            id
        }
    }
`
export const LOGIN_USER = gql`
    mutation loginUser($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            username
            id
            token
        }
    }
`
