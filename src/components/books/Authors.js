import React from 'react'
import {useApolloClient, useQuery, useSubscription} from "@apollo/client";
import {ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED} from "../../queries";
import SetBirthYear from "./SetBirthYear";
import {Table} from "react-bootstrap";

const Authors = ({setMessage}) => {
    const {loading, error, data} = useQuery(ALL_AUTHORS)
    const client = useApolloClient()
    const updateCacheWith = (addedBook) => {
        const includedIn = (set, object) => set.map(author => author._id).includes(object._id)
        const dataInStore = client.readQuery({query: ALL_AUTHORS})
        if (!dataInStore) return
        if (!includedIn(dataInStore.allAuthors, addedBook.author)) {
            client.writeQuery({
                query: ALL_AUTHORS,
                data: {allAuthors: dataInStore.allAuthors.concat(addedBook.author)}
            })
        }
    }
    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({subscriptionData}) => {
            const addedBook = subscriptionData.data.bookAdded
            setMessage(`New book: ${addedBook.title}`, false)
            updateCacheWith(addedBook)
        }
    })
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
