import React from 'react'
import {useQuery} from "@apollo/client";
import {ALL_AUTHORS} from "../../queries";
import SetBirthYear from "./SetBirthYear";
import {Table} from "react-bootstrap";

const Authors = ({setMessage}) => {
    const {loading, error, data} = useQuery(ALL_AUTHORS)
    if (loading) return <div>loading authors...</div>
    if (error) {
        console.log(error)
        return <div>An error has occured</div>
    }
    const authors = data.allAuthors
    return (
        <div>
            <Table responsive striped variant="dark">
                <tbody>
                <tr>
                    <th>Author</th>
                    <th>Born in</th>
                    <th>Books</th>
                </tr>
                {authors.map(a =>
                    <tr key={a.name}>
                        <td>{a.name}</td>
                        <td>{a.born ? a.born : 'Unknown'}</td>
                        <td>{a.bookCount}</td>
                    </tr>
                )}
                </tbody>
            </Table>
            <SetBirthYear authors={authors} setMessage={setMessage}/>
      </div>
  )
}

export default Authors
