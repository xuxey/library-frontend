import React from "react";
import {useMutation} from "@apollo/client";
import {REGISTER_USER} from "../../mutations";
import {useHistory} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Button} from "react-bootstrap";

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
    const wingOptions = ['Select','A','B','C','D','E','F','N/A']
    return (
        <Formik
            initialValues={{
                username: '',
                password: '',
                apartmentWing: wingOptions[0],
                apartmentNumber: '',
                phoneNumber: ''
            }}
            validate={values => {
                const errors = {}
                if (!values.username)
                    errors.username = 'Required';
                else if(values.username.length<3)
                    errors.username = 'You need a longer username'
                if (!values.password)
                    errors.password = 'Required'
                else if(values.password.length<6)
                    errors.password = 'You need a longer password'
                if (values.apartmentWing==='Select')
                    errors.apartmentWing = 'Required'
                if (!values.apartmentNumber)
                    errors.apartmentNumber = 'Required'
                else if (Number(values.apartmentNumber<1000) || Number(values.apartmentNumber>9999))
                    errors.apartmentNumber = 'Apartment Number must be a 4 digit number'
                if (!values.phoneNumber)
                    errors.phoneNumber = 'Required'
                return errors;
            }}
            onSubmit={async (values, {setSubmitting}) => {
                const user = {...values}
                let loggedInUser = await registerUser({variables: {
                        ...values,
                        apartmentNumber: Number(values.apartmentNumber),
                        phoneNumber: String(values.phoneNumber)
                    }
                })
                if(!loggedInUser || !loggedInUser.data.register) {
                    setMessage('This username is taken', true)
                    return
                }
                loggedInUser = loggedInUser.data.register
                setUser(loggedInUser)
                window.localStorage.setItem('libraryUser', JSON.stringify(loggedInUser))
                setMessage(`Logged in as ${values.username}`, false)
                history.push('/books')
                setSubmitting(false)
            }}
        >
            <Form>
                <div className={"row"}>
                    <div className={"form-group col"}>
                        <div className="form-label">Username</div>
                        <Field type="text" name="username" className="form-control"/>
                        <ErrorMessage name="username" component="div" style={{color: "#ff0000"}} />
                    </div>
                    <div className={"form-group col"}>
                        <div className="form-label">Password</div>
                        <Field type="password" name="password" className="form-control"/>
                        <ErrorMessage name="password" component="div" style={{color: "#ff0000"}}/>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"input-group col lg"}>
                        <div className="input-group-prepend input-group-text">Apartment</div>
                        <div className="input-group-prepend">
                            <Field name="apartmentWing" component="select" placeholder="Select" id="apartmentWing">
                                {wingOptions.map(wing => <option value={wing} key={wing}>{wing}</option>)}
                            </Field>
                        </div>
                        <Field type="number" name="apartmentNumber" className="form-control"/>
                    </div>
                    <div className={"input-group col lg"}>
                        <div className="input-group-prepend input-group-text">Phone</div>
                        <div className="input-group-prepend"><span className="input-group-text">+91</span></div>
                        <Field type="number" name="phoneNumber" className="form-control"/>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col lg"}>
                        <ErrorMessage name="apartmentWing" component="div" style={{color: "#ff0000"}}/>
                        <ErrorMessage name="apartmentNumber" component="div" style={{color: "#ff0000"}}/>
                    </div>
                    <div className={"col lg"}>
                        <ErrorMessage name="phoneNumber" component="div" style={{color: "#ff0000"}}/>
                    </div>
                </div>
                <div className={"row"} style={{paddingTop: 10}}>
                    <div className="col">
                        <Button variant="primary" id="register-button" type="submit">Register</Button>
                    </div>
                </div>
            </Form>
        </Formik>
    )
}

export default RegisterForm

/*
* <Form onSubmit={onSubmit}>
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
* */
