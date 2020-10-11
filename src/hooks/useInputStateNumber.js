import { useState } from 'react';

// A React Hook for validating number inputs. Number inputs are annoying 
// because an empty number input is an empty string. In some cases,
// the number 0 s not a valid input as dividing by zero leads to errors. 
function useInputStateNumber(initialValue='', requireZero=true) {
    let [number, setNumber] = useState(initialValue);
    let [touched, setTouched] = useState(false);
    let [error, setError] = useState('');
    
    const numberValidate = (val) => {
        let checkVal = parseFloat(val);
        if(!touched) {
            setTouched(true);
            setNumber(checkVal);
            if(requireZero && checkVal === 0) {
                setError('Required');
            } else {
                setError('');
            }
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

    return [number, numberValidate, touched, setTouched, error, setError, handleBlur];
}

export default useInputStateNumber;