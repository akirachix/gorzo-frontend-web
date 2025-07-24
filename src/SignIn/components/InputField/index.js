import React from "react";
import './index.css'

function InputField( {label,placeholder,type="text",value,name, onChange}) {
    return (
        <div className="input-container">
        <div className="input-group">
      
                <label> {label}</label>
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    name={name}
                    onChange={onChange} />

        </div>
        </div>
    )
}




export default InputField;