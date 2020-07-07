import React from 'react'
import {Alert} from "react-bootstrap";

const Notification = (props) => {
    if (!props.message || props.message.text === '') return null
    return (
        <Alert variant={props.message.error ? 'danger' : 'success'}>
            {props.message.text}
        </Alert>
    )
}

export default Notification
