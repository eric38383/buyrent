import React from 'react';
import PropTypes from 'prop-types';

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

InputNumber.propTypes = {
    label: PropTypes.any.isRequired,
    error: PropTypes.any.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    value: PropTypes.any.isRequired
}

export default InputNumber;