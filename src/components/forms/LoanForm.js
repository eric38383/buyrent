import React, { useState, useContext, useEffect } from 'react';
import { Global } from '../../contexts/global';
import useInputStateNumber from '../../hooks/useInputStateNumber';
import InputNumber from '../InputNumber';
import { loanFuncs } from '../../utilities/loan';
import { moneyFormat } from '../../utilities/helpers';

const DownPayment = () => {
    const [state, dispatch] = useContext(Global);
    const { loan, property } = state;
    const [downPaymentPer, setDownPayment] = useState(loan.downPaymentPer);
    
    useEffect(() => {
        const loan = {
            downPaymentPer: downPaymentPer,
        };

        dispatch({ type: "SET_LOAN_FIELD", payload: loan });
    },  [downPaymentPer]);

    return (
        <>
            <label>Down Payment: <span className='bold'>{downPaymentPer}%</span> <span>Loan Amount:</span><span className='bold'> {moneyFormat(loanFuncs.loanAmount(loan, property.price))}</span></label>
            <input value={downPaymentPer} className='range' type='range' min='0' max="99.9" onChange={(e) => setDownPayment(e.target.value)}></input>
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
        const inputsTouched = moMITouched && closingCostsTouched
        const loanObj = {
            term: term,
            rate: rate,
            closingCosts: closingCosts,
            moMI: moMI,
            hasError: !inputsTouched || (termError + rateError + closingCostsError + moMIError) ? true : false
        };
        dispatch({ type: "SET_LOAN_FIELD", payload: loanObj });
    },  [term, rate, closingCosts, moMI]);

    return (
      <>
        <DownPayment />
        <label>Term</label>
        <select
          className="select"
          onChange={e => setTerm(e.target.value)}
          onBlur={e => handleTermBlur()}
          value={term}
        >
          <option value={10}>10 yrs</option>
          <option value={15}>15 yrs</option>
          <option value={20}>20 yrs</option>
          <option value={25}>25 yrs</option>
          <option value={30}>30 yrs</option>
          <option value={40}>40 yrs</option>
        </select>
        {termError ? <div className="form-error">{termError}</div> : null}
        <InputNumber 
            label='Rate'
            error={rateError}
            handleChange={setRate}
            handleBlur={handleRateBlur}
            value={rate}
        />
        <InputNumber 
            label='Closing Costs'
            error={closingCostsError}
            handleChange={setClosingCosts}
            handleBlur={handleClosingBlur}
            value={closingCosts}
        />
        <InputNumber 
            label='Monthly Mortgage Insurance'
            error={moMIError}
            handleChange={setMoMI}
            handleBlur={handleMIBlur}
            value={moMI}
        />
      </>
    );
}

export default LoanForm;