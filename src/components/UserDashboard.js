import React, {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {SELF_USER} from "../queries";
import Form from "react-bootstrap/Form";
import {Button, Col, InputGroup} from "react-bootstrap";
import {UPDATE_USER} from "../mutations";

const UserDashboard = () => {
    const {loading, data, error} = useQuery(SELF_USER)
    const [wing, setWing] = useState('Select')
    const [flatNumber, setFlatNumber] = useState('')
    const [phone, setPhone] = useState('')
    const wingOptions = ['Select', 'A', 'B', 'C', 'D', 'E', 'F', 'N/A']
    useEffect(()=>{
        if(loading) return
        const user = data.me
        setWing(user.apartmentWing)
        setFlatNumber(user.apartmentNumber)
        setPhone(user.phoneNumber)
    }, [loading, data])
    //const [updateUser] = useMutation(UPDATE_USER)
    const onSubmit = async (event) => {
        event.preventDefault()
        if (wing === 'Select') {
            //setMessage('Select your apartment wing', true)
            return
        }
        /*let updated = await updateUser({
            variables: {
                username: data.me.username,
                apartmentWing: wing,
                apartmentNumber: Number(flatNumber),
                phoneNumber: phone
            }
        })*/
    }
    if (loading) return <div>Loading...</div>
    if (error) {
        console.log(error)
        return <div>An Error has occurred</div>
    }
    const user = data.me
    return (
        <div>
            <h4>My Books</h4>
            <ol>
                {(user.borrowedBooks && user.borrowedBooks.length > 0) ?
                    user.borrowedBooks.map(book =>
                        <li>
                            {book.title} by {book.author}
                        </li>
                    ) : 'You do not have any borrowed books yet.'
                }
            </ol>
            <hr/>
            <h4>My info</h4>
            <Form onSubmit={onSubmit}>
                <Form.Row>
                    <InputGroup as={Col} lg={true}>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Apartment</InputGroup.Text>
                        </InputGroup.Prepend>
                        <InputGroup.Prepend>
                            <Form.Control
                                value={wing}
                                as="select" custom onChange={e => {
                                e.preventDefault();
                                setWing(e.target.value)
                            }}>
                                {wingOptions.map(wing => <option key={wing}>{wing}</option>)}
                            </Form.Control>
                        </InputGroup.Prepend>
                        <Form.Control id='flat-number' type="number" value={flatNumber}
                                      placeholder="Apartment Number" onChange={e => setFlatNumber(e.target.value)}/>
                    </InputGroup>
                    <InputGroup as={Col} lg={true}>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Phone</InputGroup.Text>
                        </InputGroup.Prepend>
                        <InputGroup.Prepend>
                            <InputGroup.Text>+91</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control id='phone' value={phone} onChange={e => setPhone(e.target.value)}/>
                    </InputGroup>
                </Form.Row>
                <Form.Row style={{paddingTop: 10}}>
                    <Col>
                        <Button variant="primary" id="update-button" type="submit">Update</Button>
                    </Col>
                </Form.Row>
            </Form>
        </div>
    )
}

export default UserDashboard
