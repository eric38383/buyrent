import React from 'react';
import { moneyFormat } from '../../utilities/helpers';


const BottomLine = ({ netWorthDiff, colors }) => {
    return (
      <>
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
      </>
    );
}

export default BottomLine