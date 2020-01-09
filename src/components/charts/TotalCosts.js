import React from 'react'
import {
    FlexibleXYPlot, 
    XAxis, 
    YAxis, 
    HorizontalGridLines, 
    LineSeries,
    VerticalGridLines
} from 'react-vis';

const TotalCostsChart = ({ width, height, data }) => {
    const format = data.map((d, i) => {
        return [i, d];
    })
    return (
        <FlexibleXYPlot
        width={700}
        height={300}
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
                color="red"
                strokeWidth={3}
                data={format}
            />
            <XAxis 
              tickFormat={v => parseInt(v)}
              style={{
                line: {stroke: 'lightgrey'},
                ticks: {stroke: 'lightgrey'},
                text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
            }}
            />
            <YAxis 
              style={{
                line: {stroke: 'lightgrey'},
                ticks: {stroke: 'lightgrey'},
                text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
                }}
            />
        </FlexibleXYPlot>
    )
}


export default TotalCostsChart;