import React, { useContext, useEffect } from 'react';
import { Global } from '../../contexts/global';
import useInputStateNumber from '../../hooks/useInputStateNumber';

const DownPayment = () => {
    const [state, dispatch] = useContext(Global);
    const { loan, property } = state;
    const [downPayment, setDownPayment, downPaymentTouched, downPaymentError, setDownPaymentError, handleDownPaymentBlur] = useInputStateNumber(loan.downPayment, false);
    
    useEffect(() => {
        const loan = {
            downPayment: downPayment,
        };

        dispatch({ type: "SET_LOAN_FIELD", payload: loan });
    },  [downPayment]);

    const handleBlur = (e) => {
        handleDownPaymentBlur(e);
        if(!loan.closingCosts && property.price) {
            const cc = { closingCosts: Math.round(loan.estimatedClosingCosts(property.price)) }
            dispatch({ type: "SET_LOAN_FIELD", payload: cc });
        }
    }

    return (
        <>
            <label>Down Payment</label>
            <input 
                type='number'
                className={`input ${downPaymentError ? 'form-input-error' : ''}`}
                onChange={(e) => setDownPayment(e.target.value)}
                onBlur={(e) => handleBlur(e)}
                value={downPayment}
            />
            {downPaymentError ? <div className='form-error'>{downPaymentError}</div> : null}
        </>
    )
}


const LoanForm = () => {
    const [state, dispatch] = useContext(Global);
    const { loan } = state;
    const [term, setTerm, termTouched, termError, setTermError, handleTermBlur] = useInputStateNumber(loan.term);
    const [rate, setRate, rateTouched, rateError, setRateError, handleRateBlur] = useInputStateNumber(loan.rate);
    const [closingCosts, setClosingCosts, closingCostsTouched, closingCostsError, setClosingCostsError, handleClosingBlur] = useInputStateNumber(loan.closingCosts, false);
    const [moMI, setMoMI, moMITouched, moMIError, setMoMIError, handleMIBlur] = useInputStateNumber(loan.moMI, false);

    useEffect(() => {
        const loanObj = {
            term: term,
            rate: rate,
            closingCosts: closingCosts,
            moMI: moMI
        };
        dispatch({ type: "SET_LOAN_FIELD", payload: loanObj });
    },  [term, rate, closingCosts, moMI]);

    return (
        <>
            <DownPayment />
            <label>Term</label>
            <select
                className='select'
                onChange={(e) => setTerm(e.target.value)}
                onBlur={(e) => handleTermBlur()}
                value={term}
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
                value={rate}
            />
            {rateError ? <div className='form-error'>{rateError}</div> : null}
            <label>Closing Costs</label>
            <input 
                type='number'
                className={`input ${closingCostsError ? 'form-input-error' : ''}`}
                onChange={(e) => setClosingCosts(e.target.value)}
                onBlur={(e) => handleClosingBlur(e)}
                value={closingCosts}
            />
            {closingCostsError ? <div className='form-error'>{closingCostsError}</div> : null}
            <label>Monthly Mortgage Insurance</label>
            <input 
                type='number'
                className={`input ${moMIError ? 'form-input-error' : ''}`}
                onChange={(e) => setMoMI(e.target.value)}
                onBlur={(e) => handleMIBlur(e)}
                value={moMI}
            />
            {moMIError ? <div className='form-error'>{moMIError}</div> : null}
        </>
    )
}

export default LoanForm;