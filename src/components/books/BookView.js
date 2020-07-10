import React, {useEffect, useState} from "react";
import {useParams, useHistory} from "react-router-dom"
import {useMutation, useQuery} from "@apollo/client";
import {ALL_BOOKS, BOOK_BY_ID} from "../../queries";
import axios from "axios"
import {Button, ButtonGroup, Col, Image, Row} from "react-bootstrap";
import {DELETE_BOOK} from "../../mutations";

const BookView = ({user, showMessage}) => {
    const {id} = useParams()
    const {loading, data, error} = useQuery(BOOK_BY_ID, {variables:{id}})
    const [description, setDescription] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [deleteBookById] = useMutation(DELETE_BOOK, {
        refetchQueries: [{query: ALL_BOOKS}],
        onError: error => {
            console.log(error)
            showMessage(error.graphQLErrors[0].message, true)
        }
    })
    const history = useHistory()
    const wishlistClick = () => {
        if(!user)
            history.push('/login')
        //todo
    }

    const reserveClick = () => {
        //todo
        if(!user)
            history.push('/login')
    }

    const deleteBook = async () => {
        await deleteBookById({variables:{id}})
        showMessage(`Book ${book.title} deleted successfully`,false)
        history.push('/books')
    }
    useEffect(()=>{
        if(!data) return
        const searchTerm = data.bookById.title.replace(' ','+')+'+'+data.bookById.author.replace(' ','+')
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
            .then(res => {
                if(res && res.data.items.length>0) {
                    const item = res.data.items[0]
                    setDescription(item.volumeInfo.description)
                    setThumbnail(item.volumeInfo.imageLinks.thumbnail)
                }
            })
            .catch((err)=>{
                console.log(err)
                setDescription('Description not available')})
                setThumbnail('')
    }, [data])
    if(loading)
        return <div>Loading...</div>
    if(error) {
        console.log(error)
        return <div>An Error has occured</div>
    }
    const book = data.bookById
    return (
        <div>
            <Row>
                <Col>
                    <h3>{book.title} by {book.author}</h3>
                </Col>
                <Col>
                    <ButtonGroup className="float-right">
                        <Button variant={"primary"} onClick={wishlistClick}>Wishlist</Button>
                        <Button variant={"success"} onClick={reserveClick}> Reserve </Button>
                        {
                            user && user.username==='admin' &&
                            <Button variant={"danger"} onClick={deleteBook}>Delete</Button>
                        }
                    </ButtonGroup>
                </Col>
            </Row>
            <hr/>
            <h5>Genres: <i>{book.genres.join(',')}</i></h5>
            <Row>
                <Col sm={2}>
                    <Image src={thumbnail} thumbnail/>
                </Col>
                <Col>
                    <p className="text-break">{description}</p>
                </Col>
            </Row>
        </div>
    )
}

export default BookView
