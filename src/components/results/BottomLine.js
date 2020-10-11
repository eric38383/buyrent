import React from 'react';
import PropTypes from 'prop-types';
import { moneyFormat } from '../../utilities/helpers';


const BottomLine = ({ netWorthDiff, colors }) => {
    return (
      <>
        <div className="row">
          <h4>The Bottom Line</h4>
        </div>
        <div className="row">
          <div className="col bottom-line">
            After 9 years, Your Net Worth will increase by{" "}
            <span
              className="bold"
              style={{ color: netWorthDiff > 0 ? colors[0] : colors[1], fontSize: "1.3em" }}
            >
              {moneyFormat(Math.abs(netWorthDiff))}
            </span>{" "}
            more if you {netWorthDiff > 0 ? "rent" : "purchase"} a home.
          </div>
        </div>
      </>
    );
}

BottomLine.propTypes = {
  netWorthDiff: PropTypes.number.isRequired,
  colors: PropTypes.array.isRequired
}

export default BottomLine