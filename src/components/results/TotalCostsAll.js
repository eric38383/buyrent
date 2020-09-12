import React from 'react';
import PropTypes from 'prop-types';
import TotalCostsChart from '../charts/TotalCosts';
import SimpleTable from '../SimpleTable';
import { moneyFormat } from '../../utilities/helpers';
import { DiscreteColorLegend } from 'react-vis';

const TotalCostsAll = ({ totalRent, totalPropCosts, colors, tableCosts }) => {

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
    );
}

TotalCostsAll.propTypes = {
  totalRent: PropTypes.array.isRequired,
  totalPropCosts: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired,
  tableCosts: PropTypes.array.isRequired,
}

export default TotalCostsAll