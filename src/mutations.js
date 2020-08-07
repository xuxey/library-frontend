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
            author 
            genres
            price
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
export const DELETE_BOOK = gql`
    mutation removeBook($id: String!) {
        deleteBook(id: $id)
    }
`

export const RESERVE_BOOK = gql`
    mutation reserveBook($id:String!) {
        reserveBook(id:$id) {
            title
            borrower {
                username
            }
        }
    }
`

export const SET_AVAILABLE = gql`
    mutation setBookAvailable($id: String!) {
        setAvailable(id: $id) {
            title
            borrower {
                username
            }
        }
    }
`
export const TOGGLE_WISHLIST = gql`
    mutation wishlist($id: String!) {
        toggleBookWishlist(id: $id)
    }
`

export const SEND_SMS = gql`
    mutation sendSMS($phone:String!) {
        sendSMS(phone: $phone)
    }
`

export const VERIFY_SMS = gql`
    mutation verify($phone:String!, $code: Int!) {
        verifySMS(phone: $phone, code:$code)
    }
`

/*export const UPDATE_USER = gql`
    mutation updateUser(
        $apartmentWing: String!
        $apartmentNumber: Int!
        $phoneNumber: String!) {
        updateUser(apartmentWing: $apartmentWing, apartmentNumber: $apartmentNumber,
            phoneNumber: $phoneNumber) {
            username
            token
            id
        }
    }
`*/
