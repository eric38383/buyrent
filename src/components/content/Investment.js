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
              It is normally said that an investor should have a 60/40 split
              between stocks and bonds. A younger investor should take more risk
              and have a larger part of his portfolio in stocks, while an older
              investor should lean towards less risky assets.
            </div>
            <div className="form-inner-title">Average Returns:</div>
            <div className="form-inner-content">
              <div>Bonds: {investment.bondReturns.toFixed(2)}%</div>
              <div>Stocks: {investment.stockReturns}%</div>
              <div>
                Your Average Rate: {investment.averageReturn().toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default InvestmentContent;