import React from 'react';


const Input = ({ inputProps, error }) => {
    return (
        <>
            <label>Price</label>
            <input 
                className={`input${error ? ' form-input-error' : ''}`}
                {...inputProps}
            />
            {error ? <div className='form-error'>{error}</div> : null}
        </>
    )
}

export default Input;