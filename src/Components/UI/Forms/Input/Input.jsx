import React from 'react';
import './Input.css'
import InputMask from 'react-input-mask';

 const Input = ({elementType, elementConfig, label, value, handleOnChange, style=null}) => {

    return (
        <div className="Input">
            {label && <label className="Label" htmlFor={elementConfig.name} style={style}>{label}</label>}
            <InputMask className="InputElement" {...elementConfig} value={value} onChange={handleOnChange} style={style}/>
        </div>
    )
}

export default Input;