import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom"
import {useLazyQuery, useMutation, useQuery} from "@apollo/client";
import {ALL_BOOKS, BOOK_BY_ID, SELF_USER} from "../../queries";
import axios from "axios"
import {Badge, Button, ButtonGroup, Col, Image, Row} from "react-bootstrap";
import {DELETE_BOOK, RESERVE_BOOK, SET_AVAILABLE, TOGGLE_WISHLIST} from "../../mutations";
import Footer from "../Footer";

const BookView = ({user, showMessage}) => {
    const [getMe, response] = useLazyQuery(SELF_USER, {pollInterval: 2000})
    const onError = error => {
        console.log(error)
        showMessage(error.graphQLErrors[0].message, true)
    }
    const {id} = useParams()
    const {loading, data, error} = useQuery(BOOK_BY_ID, {variables:{id},
        pollInterval: 2000,
    })
    const [description, setDescription] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [confirmReserve, setConfirmReserve] = useState(false)
    const [deleteBookById] = useMutation(DELETE_BOOK, {
        refetchQueries: [{query: ALL_BOOKS}],
        onError
    })
    const [reserveBook] = useMutation(RESERVE_BOOK, {
        refetchQueries: [{query: ALL_BOOKS},{query: SELF_USER}],
        onError
    })
    const [setBookAvailable] = useMutation(SET_AVAILABLE, {
        refetchQueries: [{query: ALL_BOOKS}, {query: BOOK_BY_ID}],
        onError
    })
    const [toggleWishlist] = useMutation(TOGGLE_WISHLIST, {
        refetchQueries: [{query: SELF_USER}],
        onError
    })
    const history = useHistory()
    const wishlistClick = async () => {
        if (!user)
            history.push('/login')
        const result = await toggleWishlist({variables: {id}})
        if (result.data.toggleBookWishlist) {
            showMessage(`Wishlist: ${result.data.toggleBookWishlist} ${book.title}`)
        } else {
            showMessage(`An error has occured`, true)
        }
    }

    const reserveClick = async () => {
        if (!user) {
            history.push('/login')
            return
        }
        await getMe()
        if (response.data)
            user = response.data.me
        console.log('user ', user)
        if (user.borrowedBooks && user.borrowedBooks.length > 1) {
            showMessage('You have reached your limit for reservations', true)
            return
        }
        if (!confirmReserve) {
            setConfirmReserve(true)
            showMessage('Click confirm to reserve this book. Action may not be reversed')
            return
        }
        let book = await reserveBook({variables: {id}})
        book = book.data.reserveBook
        if (book.borrower.username === user.username) {
            showMessage(`${book.title} has been reserved for you. Pick it up at D 1206 between 6 and 9 PM in 24 hours!`)
        }
    }
    const markAvailable = async () => {
        if (!user && user.username === 'admin')
            return
        const book = await setBookAvailable({variables:{id}})
        console.log(book)
        if (book.borrower === null) {
            showMessage(`${book.title} has been set to available`)
        }
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
    console.log(user)
    const book = data.bookById
    return (
        <>
            <Row>
                <Col>
                    <h3>
                        {book.title} by {book.author} {book.borrower && user && user.username === 'admin' ?
                        <Badge variant={'secondary'}>Reserved by {book.borrower.username}</Badge> : null}
                    </h3>
                </Col>
                <Col>
                    <ButtonGroup className="float-right">
                        <Button variant={"primary"} onClick={wishlistClick}>Wishlist</Button>
                        {book.borrower ?
                            user && user.username === 'admin' ?
                                <Button variant={"warning"} onClick={markAvailable}>Set Available</Button> :
                                <Button variant={"secondary"} disabled>Unavailable</Button> :
                            <Button variant={"success"}
                                    onClick={reserveClick}> {confirmReserve ? 'Confirm' : 'Reserve'} </Button>
                        }
                        {
                            user && user.username === 'admin' &&
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
                    <sub style={{color:"#AAA"}}>
                        The above automated excerpt is powered by the Google Books API.
                        <br/>
                        Actual book may vary from the pictorial representation and description.
                    </sub>
                </Col>
            </Row>
            <Footer/>
        </>
    )
}

export default BookView
