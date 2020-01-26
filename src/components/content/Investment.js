import React, { useContext } from 'react';
import { Global } from '../../contexts/global';
import { DiscreteColorLegend } from 'react-vis';
import Pie from '../charts/Pie';
import InvestmentForm from '../forms/InvestmentForm';

const InvestmentContent = ({ colors }) => {  
    const [state, dispatch] = useContext(Global);
    const { investment } = state;
    const formate = [{ angle: investment.stocks }, { angle: investment.bonds }];
    return (
      <div className="row form-section">
        <div className="form-inner">
          <h2>Investment Profile</h2>
          <InvestmentForm />
        </div>
        <div className="row form-inner">
          <div className="col is-half">
            <DiscreteColorLegend
              colors={colors}
              items={[
                { title: `Bonds ${investment.bonds}%`, strokeWidth: 4 },
                { title: `Stocks ${investment.stocks}%`, strokeWidth: 4 }
              ]}
              orientation="horizontal"
            />
            <Pie data={formate} height={150} width={150} colors={colors} />
          </div>
          <div className="col is-half">
            <div className="form-inner-title">Investment Objectives</div>
            <div className="form-inner-content">
              Investment professionals insist that a perfectly balanced portfolio 
              should have a 60/40 split between stocks and bonds. A younger investor 
              should take on more risk and own more stocks, while an older
              investor should lean towards less risky assets like bonds.
            </div>
            <div className="form-inner-title">Average Returns Since 1926:</div>
            <div className="form-inner-content">
              <div>Bonds: {investment.bondReturns.toFixed(2)}%</div>
              <div>Stocks: {investment.stockReturns}%</div>
              <div>
                Your Average Return Rate: {investment.averageReturn().toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default InvestmentContent;