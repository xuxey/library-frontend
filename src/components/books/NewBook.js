import React, {useState} from 'react'
import {ADD_BOOK} from "../../mutations";
import {useMutation} from "@apollo/client";
import {ALL_AUTHORS, ALL_BOOKS} from "../../queries";
import {Button, Form, Col} from "react-bootstrap";

const NewBook = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [published, setPublished] = useState('')
    const [genre, setGenre] = useState('')
    const [genres, setGenres] = useState([])
    const [createBook] = useMutation(ADD_BOOK, {
            refetchQueries: [{query: ALL_AUTHORS}, {query: ALL_BOOKS}],
            onError: error => {
                console.log(error)
                props.showMessage(error.graphQLErrors[0].message, true)
            }
        }
    )

    if (!props.user)
        return <div>You need to be logged in to view this resource</div>

    const submit = async (event) => {
        event.preventDefault()
        const pub = Number(published)
        await createBook({variables: {title, author, published: pub, genres}})
        console.log('add book...')

        setTitle('')
        setPublished('')
        setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
      <Form onSubmit={submit}>
          <Form.Row>
              <Form.Group as={Col}>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                      placeholder="Name of the Book"
                      value={title}
                      onChange={({target}) => setTitle(target.value)}
                  />
              </Form.Group>
          </Form.Row>
          <Form.Row>
              <Form.Group as={Col}>
                  <Form.Label>Author</Form.Label>
                  <Form.Control
                      placeholder="Full name of the Author"
                      value={author}
                      onChange={({target}) => setAuthor(target.value)}
                  />
              </Form.Group>

              <Form.Group as={Col}>
                  <Form.Label>Published</Form.Label>
                  <Form.Control
                      placeholder="Year"
                      type='number'
                      value={published}
                      onChange={({target}) => setPublished(target.value)}
                  />
              </Form.Group>
          </Form.Row>
          <Form inline>
              <Form.Group>
                  <Form.Control
                      placeholder="Add genres"
                      value={genre}
                      onChange={({target}) => setGenre(target.value)}
                  />
                  <Button variant='primary' onClick={addGenre} type="button">+</Button>
              </Form.Group>
          </Form>

          <div>
              <span><h4> Genres:  </h4></span>
              <span>{genres.join(',')}</span>


          </div>
          <Button type='submit'>Create Book</Button>
      </Form>
  )
}

export default NewBook
