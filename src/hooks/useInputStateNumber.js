import { useState } from 'react';

function useInputStateNumber(initialValue='', requireZero=true) {
    let [number, setNumber] = useState(initialValue);
    let [touched, setTouched] = useState(false);
    let [error, setError] = useState('');
    
    const numberValidate = (val) => {
        console.log('onChange')
        let checkVal = parseFloat(val);
        if(!touched) {
            setTouched(true);
            setNumber(checkVal);
        } else {
            if (isNaN(checkVal)) {
                setError('Required');
                setNumber(val); 
            } else if(checkVal === 0) {
                if(requireZero) {
                    setError('Required');
                } else {
                    setError('');
                }
                setNumber(checkVal); 
            } else {
                setError('');
                setNumber(checkVal);
            }
        }
    }

    const handleBlur = (e) => {
        if(!number && !touched) {
            setError('Required')
        }
    }

    return [number, numberValidate, touched, error, setError, handleBlur];
}

export default useInputStateNumber;