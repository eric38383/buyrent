import React from 'react';
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

export default Pie;