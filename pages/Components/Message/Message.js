import React from 'react'
import { Alert } from 'react-bootstrap'
const message = (props) => {
    const message = props.message
    return (
        <div>
            {message && <Alert variant={props.message.variant}>{props.message.text}</Alert>}
        </div>
    )
}
export default message