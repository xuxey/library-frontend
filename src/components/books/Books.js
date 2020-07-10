import React, {useState} from 'react'
import {useQuery} from "@apollo/client";
import {ALL_BOOKS} from "../../queries";
import {Form, InputGroup, Table, Badge} from "react-bootstrap";
import {useHistory} from "react-router-dom"
const Books = () => {
    const {loading, error, data} = useQuery(ALL_BOOKS)
    const [search, setSearch] = useState('')
    const [genreFilter, setGenreFilter] = useState('Any Genre')
    const history = useHistory()
    if (loading) return <div>loading...</div>
    if (error) {
        console.log(error)
        return <div>Error</div>
    }
    let books = data.allBooks
    console.log(books)
    let genres = []
    books.forEach(book => {
        genres = genres.concat(book.genres)
    })
    genres = ['Any Genre', ...new Set(genres)];
    books = books.filter(book => book.title.toLowerCase().includes(search.toLowerCase()) ||
                                book.author.name.toLowerCase().includes(search.toLowerCase()))
    if (genreFilter !== 'Any Genre')
        books = books.filter(book => book.genres.includes(genreFilter))
    let i = 1
    return (
        <div>
            <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control placeholder="by Title or Author" value={search} onChange={e => {
                    e.preventDefault();
                    setSearch(e.target.value)
                }}/>
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Filter</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control as="select" custom onChange={e => {
                    e.preventDefault();
                    setGenreFilter(e.target.value)
                }}>
                    {genres.map(genre => <option key={genre}>{genre}</option>)}
                </Form.Control>
            </InputGroup>
            <hr/>
            <Table striped hover variant="dark">
                <tbody>
                <tr>
                    <th>#</th>
                    <th>Book</th>
                    <th>Author</th>
                    <th>Genres</th>
                    <th>Available</th>
                </tr>
                {books.map(book =>
                    <tr key={book.title} onClick={()=>history.push(`/books/${book._id}`)}>
                        <td>{i++}</td>
                        <td>{book.title}</td>
                        <td>{book.author.name}</td>
                        <td>{book.genres.join(', ')}</td>
                        <td>{book.borrower?<Badge pill variant="secondary">
                            Taken
                        </Badge>:<Badge pill variant="success">
                            Available
                        </Badge>}</td>
                    </tr>
                )}
                </tbody>
            </Table>
      </div>
  )
}

export default Books
