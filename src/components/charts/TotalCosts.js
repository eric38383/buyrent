import React from 'react'
import {
    FlexibleXYPlot, 
    XAxis, 
    YAxis, 
    HorizontalGridLines, 
    VerticalGridLines,
    LineSeries
} from 'react-vis';

const TotalCostsChart = ({ rentCosts, propertyCosts, colors }) => {
    const rentFormatted = rentCosts.map((d, i) => [i, d]);
    const propFormatted = propertyCosts.map((d, i) => [i, d]);

    return (
        <FlexibleXYPlot
            margin={{
                left: 70,
                right: 30,
                top: 30,
                bottom: 30
            }}
            getX={(d) => d[0]}
            getY={(d) => d[1]}>

            <VerticalGridLines />
            <HorizontalGridLines />

            <LineSeries
                color={colors[0]}
                strokeWidth={2}
                data={rentFormatted}
            />
             <LineSeries
                color={colors[1]}
                strokeWidth={2}
                data={propFormatted}
            />
            <XAxis 
              title={"Year"}
              tickTotal={8}
              style={{
                line: {stroke: 'lightgrey'},
                ticks: {stroke: 'lightgrey'},
                text: {stroke: 'none', fill: '#6b6b76'}
            }}
            />
            <YAxis 
              title={"Total Costs"}
              style={{
                line: {stroke: 'lightgrey'},
                ticks: {stroke: 'lightgrey'},
                text: {stroke: 'none', fill: '#6b6b76'}
                }}
            />
        </FlexibleXYPlot>
    )
}


export default TotalCostsChart;