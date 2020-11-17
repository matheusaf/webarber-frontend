import "./Button.css";
import React from "react";

const Button = ({buttonColors=1, id, buttonText, disabled, handleOnClick, type, form, content, style=null}) => {

    const handleButtonState = () =>{
        return `btn btn-webarber-${buttonColors} ${!disabled ? "active": "disabled"}`
    };

    return (
        <div>
            <button id={id} disabled={disabled} className={handleButtonState()} type={type} form={form} content={content} onClick={handleOnClick} style={style} >
                {buttonText}
            </button>
        </div>
    );
};

export default Button;