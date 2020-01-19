import React from 'react';
import TotalCostsChart from './charts/TotalCosts';
import SimpleTable from './SimpleTable';
import InvestmentReturns from './charts/InvestmentReturns';
import { totalCostsTableData } from './tableData'
import { moneyFormat } from '../utilities/helpers';
import { calcReturns } from '../utilities/investment';
import { loanFuncs } from '../utilities/loan';
import { propFuncs } from '../utilities/property';
import { rentFuncs } from '../utilities/rent';
import { DiscreteColorLegend } from 'react-vis';

const shouldComponentNotUpdate = (prevProps, { rent, loan, property, investment}) => {
  return rent.hasError || loan.hasError || property.hasError || investment.hasError;
}

const BvrResults = React.memo(({ rent, loan, property, investment, colors }) => {
    const totalRent = rentFuncs.forecastedRentPerYear(rent, 8);
    const amort = loanFuncs.amortizationSchedule(loan, property.price);
    const totalPropCosts = propFuncs.totalCosts(property, amort, 8);
    const tableCosts = totalCostsTableData(totalRent, totalPropCosts);
    const totalRentSavings = tableCosts[tableCosts.length - 1].prop - tableCosts[tableCosts.length - 1].rent;
    const totalPropSavings = totalRentSavings < 0 ? Math.abs(totalRentSavings) : 0;
    const differences = tableCosts.slice(0,-1).map(item => item.diff);
    const downPay = loanFuncs.downPayment(loan, property.price);
    const investments = calcReturns(differences, loan.closingCosts, downPay, investment.averageReturn());
    const futureHomeValue = propFuncs.forecastedPrice(property, 8);
    const principalPaid = loanFuncs.loanAmount(loan, property.price) - amort[8 * 12].balance;
    const homeEquity = principalPaid + (futureHomeValue - property.price); 
    const costToSell = (-futureHomeValue * 0.06);
    const netWorthProp = costToSell + homeEquity + totalPropSavings;
    const netWorthRent = investments[investments.length - 1];
    const netWorthDiff = netWorthRent - netWorthProp;
  
    const dataFormatter = (obj) =>{
        if(obj.year === 'Total') {
            return {
                'year': <span className='bold'>{obj.year}</span>,
                'rent': <span className='bold'>{moneyFormat(obj.rent)}</span>,
                'prop': <span className='bold'>{moneyFormat(obj.prop)}</span>,
                'diff': <span className='bold'>{moneyFormat(obj.diff)}</span>
            }
        }

        return {
            'year': obj.year === 0 ? 'Start' : obj.year,
            'rent': moneyFormat(obj.rent),
            'prop': moneyFormat(obj.prop),
            'diff': moneyFormat(obj.diff)
        }
    }

    return (
      <section>
        <h2>Buy Vs. Rent</h2>
        <div className="row">
          <div className="bvr-totalcosts">
            <TotalCostsChart
              rentCosts={totalRent}
              propertyCosts={totalPropCosts}
              colors={colors}
            />
            <div className="center">
              <DiscreteColorLegend
                colors={colors}
                items={[
                  { title: "Rent", strokeWidth: 4 },
                  { title: "Buy", strokeWidth: 4 }
                ]}
                orientation="horizontal"
              />
            </div>
          </div>
          <div className="bvr-totalcoststable">
            <SimpleTable
              headers={["Year", "Total Buy", "Total Rent", "Difference"]}
              data={tableCosts}
              dataFormatter={dataFormatter}
              keys={["year", "prop", "rent", "diff"]}
            />
          </div>
        </div>
        <div className="row">
          <h4>Investment of Upfront Costs and Rental Savings</h4>
        </div>
        <div className="row">
          <div className="col" style={{ height: "300px", width: "100%" }}>
            <InvestmentReturns data={investments} colors={colors} />
          </div>
        </div>
        <div className="row">
          <h4>Breakdown</h4>
        </div>
        <div className="row is-small">
          <div className="col is-half">
            <div className="row bold">
              <div>
                <u>Property</u>
              </div>
            </div>
            <div className="row split">
              <div>Estimated Home Equity</div>
              <div className="bold">{moneyFormat(homeEquity)}</div>
            </div>
            <div className="row split">
              <div>Buy Savings</div>
              <div className="bold">
                {moneyFormat(Math.abs(totalPropSavings))}
              </div>
            </div>
            <div className="row split">
              <div>Cost To Sell @ 6%</div>
              <div className="bold">{moneyFormat(-futureHomeValue * 0.06)}</div>
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
              <div>Upfront Costs</div>
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
                    totalRentSavings
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
        <div className="row">
          <h4>The Bottom Line</h4>
        </div>
        <div className="row">
          <div className="col bottom-line">
            After 8 years, Your Net Worth will increase by{" "}
            <span
              className="bold"
              style={{ color: colors[0], fontSize: "1.3em" }}
            >
              {moneyFormat(Math.abs(netWorthDiff))}
            </span>{" "}
            more if you {netWorthDiff > 0 ? "rent" : "purchase"} a home.
          </div>
        </div>
      </section>
    );
}, shouldComponentNotUpdate)



export default BvrResults;