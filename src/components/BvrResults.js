import React from 'react';
import TotalCostsChart from './charts/TotalCosts';
import SimpleTable from './SimpleTable';
import InvestmentReturns from './charts/InvestmentReturns';
import { totalCostsTableData } from './tableData'
import { moneyFormat } from '../utilities/helpers';
import { calcReturns, Investment } from '../utilities/investment';
import { DiscreteColorLegend } from 'react-vis';


const BvrResults = ({ rent, loan, property, investment, colors }) => {
    const totalRent = rent.forecastedRentPerYear(10);
    const totalPropCosts = property.totalCosts(loan.calculateMonthlyPayment(property.price), 10);
    const tableCosts = totalCostsTableData(totalRent, totalPropCosts);
    const totalRentSavings = tableCosts[tableCosts.length - 1].prop - tableCosts[tableCosts.length - 1].rent;
    const differences = tableCosts.slice(0,-1).map(item => item.diff);
    const investments = calcReturns(differences, loan.closingCosts, loan.downPayment);
    const futureHomeValue = property.forecastedPrice(10);
    const amort = loan.amortizationSchedule(property.price);
    const principalPaid = loan.loanAmount(property.price) - amort[10 * 12].balance;
    const homeEquity = principalPaid + (futureHomeValue - property.price); 
    const costToSell = (-futureHomeValue * 0.06)
    const netWorthProp = costToSell + homeEquity + (totalRentSavings < 0 ? Math.abs(totalRentSavings) : 0);
    const netWorthRent = investments[investments.length - 1];
    const netWorthDiff = netWorthRent - netWorthProp;

    const dataFormatter = (obj) =>{
        return {
            'year': obj.year,
            'rent': moneyFormat(obj.rent),
            'prop': moneyFormat(obj.prop),
            'diff': moneyFormat(obj.diff)
        }
    }

    return (
      <section>
        <h2>Buy Vs. Rent</h2>
        <div className="row">
          <div className='bvr-totalcosts'>
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
          <div className='bvr-totalcoststable'>
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
            <InvestmentReturns 
                data={investments}  
                colors={colors} 
            />
          </div>
        </div>
        <div className="row">
          <h4>Breakdown</h4>
        </div>
        <div className="row is-small">
          <div className="col is-half">
          <div className='row'>
                <div><u>Property</u></div>
            </div>
            <div className="row split">
              <div>Home Equity</div>
              <div>{moneyFormat(homeEquity)}</div>
            </div>
            {totalRentSavings < 0 ?
                <div className="row split">
                    <div>Buy Savings</div>
                    <div>{moneyFormat(Math.abs(totalRentSavings))}</div>
                </div>
                :
                null
            }
            <div className="row split">
              <div>Cost To Sell @ 6%</div>
              <div>{moneyFormat(-futureHomeValue * 0.06)}</div>
            </div>
            <div className="row split">
              <div>Net Worth</div>
              <div>{moneyFormat(netWorthProp)}</div>
            </div>
          </div>
          <div className="col is-half">
            <div className='row'>
                <div><u>Rent</u></div>
            </div>
            <div className="row split">
              <div>Upfront Costs</div>
              <div>{moneyFormat(loan.downPayment + loan.closingCosts)}</div>
            </div>
            <div className="row split">
              <div>Rental Savings</div>
              <div>{moneyFormat(totalRentSavings)}</div>
            </div>
            <div className="row split">
              <div>Investment Gain</div>
                <div>{moneyFormat(investments[investments.length - 1] - investments[0])}</div>
            </div>
            <div className="row split">
                <div>Net Worth</div>
                <div>{moneyFormat(investments[investments.length - 1])}</div>
            </div>
          </div>
        </div>
        <div className='row'>
            <h4>The Bottom Line</h4>
        </div>
        <div className='row'>
            <div className='col bottom-line'>
                After 11 years, Your Net Worth will increase by <span style={{'color': colors[0], 'font-weight': '700', 'fontSize': '1.3em'}}>{moneyFormat(Math.abs(netWorthDiff))}</span> more if you {netWorthRent > 0 ? 'rent' : 'purchase'} a home.
            </div>
        </div>
      </section>
    );
}

export default BvrResults;