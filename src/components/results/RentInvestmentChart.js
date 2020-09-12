import React from 'react';
import PropTypes from 'prop-types';
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

RentInvestmentChart.propTypes = {
    investments: PropTypes.array.isRequired,
    colors: PropTypes.array.isRequired
}

export default RentInvestmentChart;