import React from "react";
import './inputField.css'

function InputField( {label,placeholder,type="text",value,name}) {
    return (
        <div className="input-container">
        <div className="input-group">
      
                <label> {label}</label>
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    name={name} />

        </div>
        </div>
    )
}




export default InputField;