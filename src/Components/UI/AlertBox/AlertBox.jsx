import './AlertBox.css'
import React from 'react';

const AlertBox = ({message}) => {
        return (
            <div className="alert alert-danger" role="alert">
                <strong>{message}</strong>
            </div>   
        )
    }

export default AlertBox;