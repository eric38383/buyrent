import React from 'react';

const InputNumber = ({ label, error, handleChange, handleBlur, value }) => {
    
    return (
        <>
            <label>{label}</label>
            <input
                type="number"
                className={`input ${error ? "form-input-error" : ""}`}
                onChange={e => handleChange(e.target.value)}
                onBlur={e => handleBlur(e)}
                value={value}
            />
            {error ? <div className="form-error">{error}</div> : null}
        </>
    )
}

export default InputNumber;