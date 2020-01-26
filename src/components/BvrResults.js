import React from 'react';
import { totalCostsTableData } from './tableData'
import { calcReturns } from '../utilities/investment';
import { loanFuncs } from '../utilities/loan';
import { propFuncs } from '../utilities/property';
import { rentFuncs } from '../utilities/rent';
import TotalCostsAll from './results/TotalCostsAll';
import RentInvestmentChart from './results/RentInvestmentChart';
import Breakdown from './results/Breakdown';




const shouldComponentNotUpdate = ( prevProps, { rent, loan, property, investment }) => {
  return rent.hasError || loan.hasError || property.hasError;
}

const BvrResults = React.memo(({ rent, loan, property, investment, colors }) => {
    const totalRent = rentFuncs.forecastedRentPerYear(rent, 8);
    const amort = loanFuncs.amortizationSchedule(loan, property.price);
    const totalPropCosts = propFuncs.totalCosts(property, amort, 8);
    const tableCosts = totalCostsTableData(totalRent, totalPropCosts);
    const downPay = loanFuncs.downPayment(loan, property.price);
    const differences = tableCosts.slice(0,-1).map(item => item.diff);
    const investments = calcReturns(differences, loan.closingCosts, downPay, investment.averageReturn());
    
    return (
      <section>
        <h2>Buy Vs. Rent</h2>
          <TotalCostsAll 
            totalRent={totalRent}
            totalPropCosts={totalPropCosts}
            colors={colors}
            tableCosts={tableCosts}
          />
        <div className="row">
          <h4>Investment of Upfront Costs and Rental Savings</h4>
        </div>
        <RentInvestmentChart 
          investments={investments}
          colors={colors}
        />
        <div className="row">
          <h4>Breakdown</h4>
        </div>
        <Breakdown 
          loan={loan}
          property={property}
          investments={investments}
          tableCosts={tableCosts}
          amort={amort}
          colors={colors}
        />
      </section>
    );
}, shouldComponentNotUpdate)



export default BvrResults;