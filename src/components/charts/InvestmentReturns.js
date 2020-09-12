import React from 'react';
import PropTypes from 'prop-types';
import {
    FlexibleXYPlot, 
    XAxis, 
    YAxis, 
    HorizontalGridLines, 
    VerticalBarSeries
} from 'react-vis';

const InvestmentReturns = ({ data , colors }) => {
  const formatted = data.map((d, i) => {
    return {'x': i, 'y': d }
  });
    return (
      <FlexibleXYPlot margin={{ left: 70 }}>
        <VerticalBarSeries data={formatted} color={colors[0]} />
        <HorizontalGridLines />
        <XAxis tickTotal={8} title={"Year"} />
        <YAxis title={"Investments"} />
      </FlexibleXYPlot>
    );
}

InvestmentReturns.propTypes = {
  data: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired
}


export default InvestmentReturns;