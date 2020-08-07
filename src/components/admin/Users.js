import React, {useState} from "react";
import {ALL_USERS} from "../../queries";
import {useQuery} from "@apollo/client";
import {Button, Modal, Table} from "react-bootstrap";
import "../../App.css"

const Users = () => {
    const {loading, error, data} = useQuery(ALL_USERS, {pollInterval: 5000})
    const [selected, setSelected] = useState()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (loading) return <div>loading...</div>
    if (error) {
        console.log(error)
        return <div>Error</div>
    }
    const users = data.allUsers

    let i = 1
    return (
        <>
            <Table striped hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User</th>
                        <th>Apartment</th>
                        <th>Phone Number</th>
                        <th>Borrowed</th>
                        <th>Wishlist</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user =>
                            <tr key={user.id}>
                                <th>{i++}</th>
                                <td>{user.username}</td>
                                <td>{user.apartmentWing + " " + user.apartmentNumber}</td>
                                <td>{user.phoneNumber}</td>
                                <td>{user.borrowedBooks.length > 0 ?
                                    <Button size={"sm"} variant={"primary"} onClick={() => {
                                        setSelected(user.borrowedBooks)
                                        handleShow()
                                    }}>Show Borrowed</Button> :
                                    'No items'}
                                </td>
                                <td>{user.wishlist.length > 0 ? <Button size={"sm"} variant={"info"} onClick={() => {
                                    setSelected(user.wishlist)
                                    handleShow()
                                }}>Show Wishlist</Button> : 'No items'}</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>{
                    selected && selected.length > 0 ?
                    <Table striped hover variant="dark">
                        <thead>
                        <tr>
                            <th>Books</th>
                        </tr>
                        </thead>
                        <tbody>
                        {   selected.map(book =>
                            <tr key={book.title}>
                                <td>{book.title}</td>
                            </tr>
                        )}
                        </tbody>
                    </Table> : <h4>No items</h4>
                }</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Users
