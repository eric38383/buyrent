import { useState } from 'react';

function useInputStateNumber(initialValue='') {
    let [number, setNumber] = useState(initialValue);
    let [touched, setTouched] = useState(false);
    let [error, setError] = useState('');
    
    const numberValidate = (val) => {
        let checkVal = parseFloat(val);
        if(!touched) {
            setTouched(true);
            setNumber(checkVal);
        } else {
            if (!checkVal) {
                let set = checkVal !== 0 ? val : checkVal;
                setError('Required');
                setNumber(set);
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