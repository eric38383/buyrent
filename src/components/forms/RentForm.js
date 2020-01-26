import React, { useContext, useEffect } from 'react';
import { Global } from '../../contexts/global';
import useInputStateNumber from '../../hooks/useInputStateNumber';
import InputNumber from '../InputNumber';

const RentForm = () => {
    const [state, dispatch] = useContext(Global);
    const [monthlyRent, setRent, rentTouched, setRentTouched, rentError, setRentError, handleRentBlur] = useInputStateNumber(state.rent.monthlyRent);


    useEffect(() => {
        const rentObj = { 
            monthlyRent: monthlyRent,
            hasError: !rentTouched || rentError ? true : false,
        };
        dispatch({ type: "SET_RENT_FIELD", payload: rentObj });
    },[monthlyRent]);
    
    return (
      <>
        <InputNumber 
            label={'Monthly Rent'}
            error={rentError}
            handleChange={setRent}
            handleBlur={handleRentBlur}
            value={monthlyRent}
        />
      </>
    );
}

export default RentForm;