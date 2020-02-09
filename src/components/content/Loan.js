import React, { useContext } from 'react';
import { Global } from '../../contexts/global';
import { loanFuncs } from '../../utilities/loan';
import { formatDate, moneyFormat } from '../../utilities/helpers';
import LoanForm from '../forms/LoanForm';
import useGet from '../../hooks/useGet';


const LoanContent = () => {
  const [state, dispatch] = useContext(Global);
  const [data, loading, error] = useGet(`${process.env.REACT_APP_API_URL}/mortgage-rates`, [], []);
  const { loan, property } = state;
  const miStats = loanFuncs.getMIFalloff(loan, property.price)

    return (
      <div className="row form-section">
        <div className="form-inner">
          <h2>Loan</h2>
          <LoanForm />
        </div>
        <div className="form-inner">
          <div className="form-inner-title">Upfront Costs</div>
          <div className="form-inner-content">
            One of the main disadvantages of buying property is the upfront down
            payment and closing costs. Homeowners lose the ability to
            use that money in invest in higher returning assets. There are 
            other ways to invest in Real Estate. Check out REITs (Real Estate Investment Trusts).
          </div>
          <div className="form-inner-title">Term</div>
          <div className="form-inner-content">
            Most loan terms vary in length from 10 to 40 years. The longer the term,
            the more interest you will pay on your loan but you will have a
            smaller monthly payment.
          </div>
          <div className="form-inner-title">Current Mortgage Rates</div>
          <div className="form-inner-content row">
            <div className="col">30 YR Fixed {data[0]?.rate}%</div>
            <div className="col">15 YR Fixed: {data[1]?.rate}%</div>
            <div className="col">5/1 ARM: {data[2]?.rate}%</div>
          </div>
          <div className="form-inner-title">Mortgage Insurance</div>
          <div className="form-inner-content">
            All lenders require buyers to purchase mortgage
            insurance if the Loan-to-Value ratio is more than 80%. Often times,
            mortgage insurance is a monthly fee and may add up to
            thousands of dollars. Mortgage Insurance is no longer paid
            when you've reached a 78% Loan-to-Value ratio.
          </div>
            {miStats.miPaid !== 0 ?
            <div>
                <div className='form-inner-title'>Mortgage Insurance Analysis</div>
                <div className='form-inner-content'>
                  <div>Mortgage Insurance Payments: {miStats.payment}</div>
                  <div>Mortgage Insurance Paid: {moneyFormat(miStats.miPaid)}</div>
                  <div>Date Ended: {formatDate(miStats.date)}</div>
                </div>
              </div>
              : null
            }
        </div>
      </div>
    );
}

export default LoanContent;