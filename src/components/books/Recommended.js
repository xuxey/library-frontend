import React, {useState} from "react";
import {useQuery} from "@apollo/client";
import {BOOKS_BY_GENRE} from "../../queries";
import {Form, InputGroup, Table} from "react-bootstrap";

const Recommended = ({user}) => {
    const faveGenre = user ? user.favoriteGenre : null
    const {loading, error, data} = useQuery(BOOKS_BY_GENRE, {variables: {genre: faveGenre}})
    const [search, setSearch] = useState('')
    if (loading) return <div>Loading...</div>
    if (error) {
        console.log(error)
        return <div>An error has occured</div>
    }
    if (!data || data.allBooks.length === 0) return <div>We do not have any recommendations for you</div>
    let books = data.allBooks
    books = books.filter(book => book.title.toLowerCase().includes(search.toLowerCase()))
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

export default Recommended
