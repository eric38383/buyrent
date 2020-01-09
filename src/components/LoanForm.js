import React, { useContext, useEffect } from 'react';
import { Global } from '../contexts/global';
import useInputStateNumber from '../hooks/useInputStateNumber';


const LoanForm = () => {
    const [state, dispatch] = useContext(Global);
    const { loan } = state;
    const [downPayment, setDownPayment, downPaymentTouched, downPaymentError, setDownPaymentError] = useInputStateNumber(loan.downPayment);
    const [term, setTerm, termTouched, termError, setTermError] = useInputStateNumber(loan.term);
    const [rate, setRate, rateTouched, rateError, setRateError] = useInputStateNumber(loan.rate);
    const [closingCosts, setClosingCosts, closingCostsTouched, closingCostsError, setClosingCostsError] = useInputStateNumber(loan.closingCosts);
    const [moMI, setMoMI, moMITouched, moMIError, setMoMIError] = useInputStateNumber(loan.moMI);

    const handleBlur = (e, num, touched, setError) => {
        if(!num && !touched) {
            setError('Required')
        }
    }

    useEffect(() => {
        const loanObj = {
            downPayment: downPayment,
            term: term,
            rate: rate,
            closingCosts: closingCosts,
            moMI: moMI
        };
        dispatch({ type: "SET_LOAN_FIELD", payload: loanObj });
    },  [downPayment, term, rate, closingCosts, moMI]);

    return (
        <>
            <label>Down Payment</label>
            <input 
                type='number'
                className={`input ${downPaymentError ? 'form-input-error' : ''}`}
                onChange={(e) => setDownPayment(e.target.value)}
                onBlur={(e) => handleBlur(e, downPayment, downPaymentTouched, setDownPaymentError)}
                value={loan.downPayment}
            />
            {downPaymentError ? <div className='form-error'>{downPaymentError}</div> : null}
            <label>Term</label>
            <select
                className='select'
                onChange={(e) => setTerm(e.target.value)}
                onBlur={(e) => handleBlur(e, term, termTouched, setTermError)}
                value={loan.term}
            >
                <option value={10}>10 yrs</option>
                <option value={15}>15 yrs</option>
                <option value={20}>20 yrs</option>
                <option value={25}>25 yrs</option>
                <option value={30}>30 yrs</option>                
            </select>
            {termError ? <div className='form-error'>{termError}</div> : null}
            <label>Rate</label>
            <input 
                type='number'
                className={`input ${rateError ? 'form-input-error' : ''}`}
                onChange={(e) => setRate(e.target.value)}
                onBlur={(e) => handleBlur(e, rate, rateTouched, setRateError)}
                value={loan.rate}
            />
            {rateError ? <div className='form-error'>{rateError}</div> : null}
            <label>Closing Costs</label>
            <input 
                type='number'
                className={`input ${closingCostsError ? 'form-input-error' : ''}`}
                onChange={(e) => setClosingCosts(e.target.value)}
                onBlur={(e) => handleBlur(e, closingCosts, closingCostsTouched, setClosingCostsError)}
                value={loan.closingCosts}
            />
            {closingCostsError ? <div className='form-error'>{closingCostsError}</div> : null}
            <label>Monthly Mortgage Insurance</label>
            <input 
                type='number'
                className={`input ${moMIError ? 'form-input-error' : ''}`}
                onChange={(e) => setMoMI(e.target.value)}
                onBlur={(e) => handleBlur(e, moMI, moMITouched, setMoMIError)}
                value={loan.moMI}
            />
            {moMIError ? <div className='form-error'>{moMIError}</div> : null}
        </>
    )
}

export default LoanForm;