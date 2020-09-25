import React from 'react'
import {useMutation} from "@apollo/client";
import {LOGIN_USER} from "../../mutations";
import {Button} from "react-bootstrap";
import {useHistory} from "react-router-dom"
import {ErrorMessage, Field, Form, Formik} from "formik";

const LoginForm = ({setUser, setMessage}) => {
    const history = useHistory();
    const [loginUser] = useMutation(LOGIN_USER, {
            onError: error => setMessage(error.graphQLErrors[0].message, true)
        }
    )

    return (
        <Formik
            initialValues={{username: '', password:''}}
            validate={values => {
                const errors = {};
                if (!values.username)
                    errors.username = 'Required';
                if (!values.password)
                    errors.password = 'Required'
                return errors;
            }}
            onSubmit={async (values, {setSubmitting}) => {
                const user = {...values}
                let loggedInUser = await loginUser({variables: user})
                if (!loggedInUser || !loggedInUser.data || !loggedInUser.data.login) {
                    setMessage('Username or password is incorrect', true)
                    setSubmitting(true)
                    return
                }
                loggedInUser = loggedInUser.data.login
                setUser(loggedInUser)
                window.localStorage.setItem('libraryUser', JSON.stringify(loggedInUser))
                setMessage(`Logged in as ${values.username}`, false)
                history.push('/books')
                setSubmitting(false)
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div className={"row"}>
                        <div className={"form-group col"}>
                            <div className="form-label">Username</div>
                            <Field type="text" name="username" class="form-control"/>
                            <ErrorMessage name="username" component="div" style={{color: "#ff0000"}}/>
                        </div>
                        <div className={"form-group col"}>
                            <div className="form-label">Password</div>
                            <Field type="password" name="password" class="form-control"/>
                            <ErrorMessage name="password" component="div" style={{color: "#ff0000"}}/>
                        </div>
                    </div>
                    <Button type="submit" disabled={isSubmitting}>Submit</Button>
                </Form>
            )}
        </Formik>
    )
    //todo set that button prop to isSubmitting ^
}

export default LoginForm
