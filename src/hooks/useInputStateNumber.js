import { useState } from 'react';

function useInputStateNumber(initialValue='') {
    let [number, setNumber] = useState(initialValue);
    let [touched, setTouched] = useState(false);
    let [error, setError] = useState('');
    
    const numberValidate = (val) => {
        let checkVal = parseFloat(val);
        if(!touched) {
            setTouched(true);
            setNumber(checkVal.toString());
        } else {
            if (!checkVal) {
                let set = checkVal !== 0 ? val : checkVal;
                setError('Required');
                setNumber(set.toString());
            } else {
                setError('');
                setNumber(checkVal.toString());
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