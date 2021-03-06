import {gql} from '@apollo/client';


export const ALL_BOOKS = gql`
    query {
        allBooks    {
            title
            author 
            price
            genres
            borrower {
                username
            }
            _id
        }
    }
`

export const BOOKS_BY_GENRE = gql`
    query getBooksByGenre ($genre: String!) {
        allBooks(genre: $genre)    {
            title
            author 
            price
            genres
            borrower {
                username
            }
        }
    }
`

export const BOOK_BY_ID = gql`
    query getBook($id: String){
        bookById(id: $id){
            title
            author 
            genres
            _id
            borrower {
                username
            }
        }
    }`

export const SELF_USER = gql`
    query {
        me{
            phoneNumber
            apartmentWing
            apartmentNumber
            username
            wishlist {
                title
                author
                borrower {
                    username
                }
                genres
                _id
            }
            borrowedBooks{
                title
                author 
                genres
            }
            id
        }
    }
`

export const GET_LOGS = gql`
    query {
        allLogs{
            book {
                title
            }
            user {
                username
            }
            time
            type
            _id
        }
    }
`

export const ALL_USERS = gql`
    query {
        allUsers {
            id
            username
            apartmentNumber
            apartmentWing
            wishlist {
                title
            }
            phoneNumber
            borrowedBooks{
                title
            }
        }
    }
`
export const NAME_EXISTS = gql`
    query ($name: String!) {
        nameExists(name: $name)
    }
`

export const PHONE_LIMIT_REACHED = gql`
    query checkPhone($phone:String!) {
        phoneLimitReached(phone:$phone)
    }
`

