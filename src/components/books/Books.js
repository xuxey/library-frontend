import React, {useState} from 'react'
import {useQuery} from "@apollo/client";
import {ALL_BOOKS} from "../../queries";
import {Form, InputGroup, Table} from "react-bootstrap";

const Books = () => {
    const {loading, error, data} = useQuery(ALL_BOOKS)
    const [search, setSearch] = useState('')
    const [genreFilter, setGenreFilter] = useState('Any Genre')
    if (loading) return <div>loading...</div>
    if (error) {
        console.log(error)
        return <div>Error</div>
    }
    let books = data.allBooks
    let genres = []
    books.forEach(book => {
        genres = genres.concat(book.genres)
    })
    genres = ['Any Genre', ...new Set(genres)];
    books = books.filter(book => book.title.toLowerCase().includes(search.toLowerCase()))
    if (genreFilter !== 'Any Genre')
        books = books.filter(book => book.genres.includes(genreFilter))
    let i = 1
    return (
        <div>
            <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control placeholder="by Title" value={search} onChange={e => {
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
                    <th>Published</th>
                </tr>
                {books.map(books =>
                    <tr key={books.title}>
                        <td>{i++}</td>
                        <td>{books.title}</td>
                        <td>{books.author.name}</td>
                        <td>{books.genres.join(', ')}</td>
                        <td>{books.published}</td>
                    </tr>
                )}
                </tbody>
            </Table>
      </div>
  )
}

export default Books
