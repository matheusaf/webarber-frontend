import './Button.css'
import React from 'react';
import { useState } from 'react';

const Button = ({buttonText, disabled, handleOnClick, style=null}) => {

    const handleButtonState = ()=>{
        return `btn btn-webarber ${!disabled ? "active": "disabled"}`
    }

    return (
        <div>
            <button className={handleButtonState()} disabled={disabled} onClick={handleOnClick} style={style} >
                {buttonText}
            </button>
        </div>
    )
}

export default Button;