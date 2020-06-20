import React from 'react';
import { moneyFormat } from '../../utilities/helpers';
import PopoverInfo from '../PopoverInfo';
import { loanFuncs } from '../../utilities/loan';
import { propFuncs } from '../../utilities/property';
import BottomLine from './BottomLine';

const Breakdown = ({ investments, loan, property, tableCosts, amort, colors, costToSell }) => {
    const downPay = loanFuncs.downPayment(loan, property.price);
    const totalRentSavings = tableCosts[tableCosts.length - 1].prop - tableCosts[tableCosts.length - 1].rent;
    const totalPropSavings = totalRentSavings < 0 ? Math.abs(totalRentSavings) : 0;
    const futureHomeValue = propFuncs.forecastedPrice(property, 8);
    const principalPaid = loanFuncs.loanAmount(loan, property.price) - amort[8 * 12].balance;
    const appreciation = futureHomeValue - property.price;
    const homeEquity = principalPaid + appreciation + downPay; 
    const totalSell = (-futureHomeValue * (costToSell / 100));
    const netWorthProp = totalSell + homeEquity + totalPropSavings;
    const netWorthRent = investments[investments.length - 1];
    const netWorthDiff = netWorthRent - netWorthProp;

    return (
      <>
        <div className="row is-small">
        <div className="col is-half">
          <div className="row bold">
            <div>
              <u>Property</u>
            </div>
          </div>
          <div className="row split v-center">
            <div className='row'>
              <span style={{'paddingRight': '5px'}}>Estimated Home Equity{" "}</span>
              <PopoverInfo
                contentComponent={
                  <>
                    <div className="row split">
                      <div>Down Payment</div>
                      <div>{moneyFormat(downPay)}</div>
                    </div>
                    <div className="row split">
                      <div>Principal Paid</div>
                      <div>{moneyFormat(principalPaid)}</div>
                    </div>
                    <div className="row split">
                      <div>Home Appreciation</div>
                      <div>{moneyFormat(appreciation)}</div>
                    </div>
                  </>
                }
                title={"Home Equity Breakdown at Year 8"}
              />
            </div>
            <div className="bold">{moneyFormat(homeEquity)}</div>
          </div>
          <div className="row split">
            <div>Buy Savings</div>
            <div className="bold">
              {moneyFormat(Math.abs(totalPropSavings))}
            </div>
          </div>
          <div className="row split v-center">
            <div className="row">
              <span style={{'paddingRight': '5px'}}>Cost To Sell @ {costToSell}%{" "}</span>
            </div>
            <div className="bold">{moneyFormat(-futureHomeValue * 0.1)}</div>
          </div>
          <div className="row split">
            <div>Estimated Net Worth</div>
            <div className="bold">{moneyFormat(netWorthProp)}</div>
          </div>
        </div>
        <div className="col is-half">
          <div className="row bold">
            <div>
              <u>Rent</u>
            </div>
          </div>
          <div className="row split">
            <div>Saved Upfront Costs</div>
            <div className="bold">
              {moneyFormat(downPay + loan.closingCosts)}
            </div>
          </div>
          <div className="row split">
            <div>Rental Savings</div>
            <div className="bold">
              {moneyFormat(totalRentSavings > 0 ? totalRentSavings : 0)}
            </div>
          </div>
          <div className="row split">
            <div>Investment Gain</div>
            <div className="bold">
              {moneyFormat(
                investments[investments.length - 1] -
                  investments[0] -
                  (totalRentSavings > 0 ? totalRentSavings : 0)
              )}
            </div>
          </div>
          <div className="row split">
            <div>Estimated Net Worth</div>
            <div className="bold">
              {moneyFormat(investments[investments.length - 1])}
            </div>
          </div>
        </div>
       
      </div>
       <BottomLine 
       netWorthDiff={netWorthDiff} 
       colors={colors} 
       />
    </>
  )
}

export default Breakdown;