import React from 'react';
import PropTypes from 'prop-types';
import { RadialChart } from 'react-vis';

const Pie = ({ data, height, width, colors }) => {
    return (
        <RadialChart
            colorRange={colors}
            data={data}
            width={height}
            height={width} 
        />
    )
}

Pie.propTypes = {
    data: PropTypes.array.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    colors: PropTypes.array.isRequired
}

export default Pie;