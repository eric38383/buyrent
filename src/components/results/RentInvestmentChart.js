import React from 'react';
import InvestmentReturns from '../charts/InvestmentReturns';

const RentInvestmentChart = ({ investments, colors }) => {
    return (
        <div className="row">
            <div className="col" style={{ height: "300px", width: "100%" }}>
                <InvestmentReturns 
                    data={investments} 
                    colors={colors} 
                />
            </div>
        </div>
    )
}

export default RentInvestmentChart;