import React from "react";
import "../App.css"
import {Alert} from "react-bootstrap";
const Footer = () => {
    return (
        <Alert variant={'primary'} className="footer">
            Books can be picked up at D-1206, Pebbles 2 between 4 and 7 pm
        </Alert>
    )
}

export default Footer
