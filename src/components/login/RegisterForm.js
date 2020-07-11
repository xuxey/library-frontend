import React, {useState} from "react";
import {useMutation} from "@apollo/client";
import {REGISTER_USER} from "../../mutations";
import Form from "react-bootstrap/Form";
import {Button, Col, InputGroup} from "react-bootstrap";
import {useHistory} from "react-router-dom";

const RegisterForm = ({setUser, setMessage}) => {
    const [registerUser] = useMutation(REGISTER_USER, {
        onError: error => {
            console.log("Error Message",error.message)
            if(error.message.includes('duplicate key error'))
                setMessage('This username has been taken', error)
            else
                setMessage(error.message, true)
        }
    })
    const history = useHistory();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [wing, setWing] = useState('Select')
    const [flatNumber, setFlatNumber] = useState('')
    const [phone, setPhone] = useState('')
    const wingOptions = ['Select','A','B','C','D','E','F','N/A']
    const onSubmit = async (event) => {
        event.preventDefault()
        if(wing==='Select') {
            setMessage('Select your apartment wing', true)
            return
        }
        if(phone==='' || flatNumber==='' ) {
            setMessage('Fill out the missing fields', true)
            return
        }
        if(username.length<3 || password.length <5) {
            setMessage('You need a longer username/password', true)
            return
        }
        let loggedInUser = await registerUser({variables: {
                username,
                password,
                apartmentWing: wing,
                apartmentNumber: Number(flatNumber),
                phoneNumber: phone
            }
        })
        //console.log("REGISTER_DATA", data)
        console.log("Logged in User",loggedInUser)
        if(!loggedInUser) {
            console.log('received undefined response from server')
            return
        }
        loggedInUser = loggedInUser.data.register
        setUser(loggedInUser)
        window.localStorage.setItem('libraryUser', JSON.stringify(loggedInUser))
        setMessage(`Logged in as ${username}`, false)
        setPhone('')
        setFlatNumber('')
        setWing('')
        setPassword('')
        setUsername('')
        history.push('/books')
    }
    return (
        <Form onSubmit={onSubmit}>
            <Form.Row>
                <Form.Group as={Col} lg={true}>
                <Form.Label>Username</Form.Label>
                <Form.Control id='username' value={username} onChange={e => setUsername(e.target.value)}/>
                </Form.Group>
                <Form.Group as={Col}>
                <Form.Label>Password</Form.Label>
                <Form.Control id='password' value={password} onChange={e => setPassword(e.target.value)} type='password'/>
                </Form.Group>
            </Form.Row>
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
                <InputGroup as={Col} lg={true} >
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
                <Col >
                    <Button variant="primary" id="register-button" type="submit">Register</Button>
                </Col>
            </Form.Row>
        </Form>
    )
}

export default RegisterForm
