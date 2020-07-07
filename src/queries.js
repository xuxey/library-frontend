import {gql} from '@apollo/client';

export const ALL_AUTHORS = gql`
    query {
        allAuthors  {
            name
            _id
            born
            bookCount
        }
    }
`

export const ALL_BOOKS = gql`
    query {
        allBooks    {
            title
            author {
                name
                _id
            }
            published
            genres
            _id
        }
    }
`

export const BOOKS_BY_GENRE = gql`
    query getBooksByGenre ($genre: String!) {
        allBooks(genre: $genre)    {
            title
            author {
                name
                _id
            }
            published
            genres
        }
    }
`

export const FAVE_GENRE = gql`
    query getFavoriteGenre {
        me {
            favoriteGenre
        }
    }
`

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            title
            published
            author {
                name
                _id
            }
            _id
            genres
        }
    }
`
