import React, { useContext, useEffect } from 'react';
import { Global } from '../contexts/global';
import useInputStateNumber from '../hooks/useInputStateNumber';

const RentForm = () => {
    const [state, dispatch] = useContext(Global);
    const [monthlyRent, setRent, rentTouched, rentError, setRentError] = useInputStateNumber(state.rent.monthlyRent);

    const handleBlur = (e, num, touched) => {
        if(!num && !touched) {
            setRentError('Required')
        }
    }

    useEffect(() => {
        const rentObj = { monthlyRent: monthlyRent };
        dispatch({ type: "SET_RENT_FIELD", payload: rentObj });
    },[monthlyRent]);
    
    return (
        <>
            <label>Monthly Rent</label>
            <input
                type='number'
                className={`input ${rentError ? 'form-input-error' : ''}`}
                onChange={(e) => setRent(e.target.value)}
                onBlur={(e) => handleBlur(e, monthlyRent, rentTouched)}
                value={monthlyRent}
            />
            {rentError ? <div className='form-error'>{rentError}</div> : null}
        </>
    )
}

export default RentForm;