import React from 'react';
import './Graph.scss'
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries
} from '../../../node_modules/react-vis/dist/index';
import {curveCatmullRom} from 'd3-shape';


export default class Example extends React.Component {
  render() {
    return (
      <XYPlot
        width={700}
        height={350}>
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis title="X Axis" position="start"/>
        <YAxis title="Y Axis"/>
        <LineSeries
          className="first-series"
          data={[
            {x: 1, y: 3},
            {x: 2, y: 5},
            {x: 3, y: 15},
            {x: 4, y: 12}
          ]}/>
        <LineSeries
          className="second-series"
          data={null}/>
        <LineSeries
          className="third-series"
          curve={'curveMonotoneX'}
          style={{
            strokeDasharray: '2 2'
          }}
          data={[
            {x: 1, y: 10},
            {x: 2, y: 4},
            {x: 3, y: 2},
            {x: 4, y: 15}
          ]}
          strokeDasharray="7, 3"
          />
        <LineSeries
          className="fourth-series"
          curve={curveCatmullRom.alpha(0.5)}
          data={[
            {x: 1, y: 7},
            {x: 2, y: 11},
            {x: 3, y: 9},
            {x: 4, y: 2}
          ]}/>
      </XYPlot>
    );
  }
}