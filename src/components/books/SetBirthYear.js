import React, {useState} from 'react'
import {SET_BDAY} from "../../mutations";
import {useMutation} from "@apollo/client";
import {ALL_AUTHORS} from "../../queries";
import Select from "react-select";
import {Button, Form} from "react-bootstrap";

const SetBirthYear = (props) => {
    const authors = props.authors.map(author => {
        return {value: author.name, label: author.name}
    })
    const [author, setAuthor] = useState('')
    const [birthYear, setBirthYear] = useState('')
    const [updateBirthYear] = useMutation(SET_BDAY, {
        onError: error => props.setMessage(error.graphQLErrors[0].message, true),
        refetchQueries: [{query: ALL_AUTHORS}]
    })

    const submit = async (event) => {
        event.preventDefault()
        const setBornTo = Number(birthYear)
        await updateBirthYear({variables: {name: author.value, setBornTo}})
        console.log('update birth year')
        setBirthYear('')
    }

    return (
        <Form onSubmit={submit}>
            <h3>Update Author Birth Year</h3>
            <Form.Group>
                <Form.Label>Author</Form.Label>
                <Select
                    value={author}
                    onChange={option => setAuthor(option)}
                    options={authors}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Birth Year</Form.Label>
                <Form.Control
                    type='number'
                    value={birthYear}
                    onChange={({target}) => setBirthYear(target.value)}
                />
            </Form.Group>
            <Button type='submit'>Update</Button>
        </Form>
    )
}

export default SetBirthYear
