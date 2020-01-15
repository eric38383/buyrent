import React from 'react';
import { RadialChart } from 'react-vis';

const Pie = ({ data, height, width }) => {
    return (
        <RadialChart
            data={data}
            width={height}
            height={width} 
        />
    )
}

export default Pie;