import React from 'react';

// import Button from 'mdbreact'
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  HorizontalBarSeries,
  HorizontalBarSeriesCanvas
} from '../../../node_modules/react-vis/dist/index';

export default class Bar extends React.Component {
  state = {
    useCanvas: false
  }
    render() {
    const {useCanvas} = this.state;
    const BarSeries = useCanvas ? HorizontalBarSeriesCanvas : HorizontalBarSeries;
    // const content = useCanvas ? 'TOGGLE TO SVG' : 'TOGGLE TO CANVAS';
    return (
      <div>
       {/*// <button
        //   onClick={() => this.setState({useCanvas: !useCanvas})}
       //   buttonContent={content}/>}*/}
        <XYPlot
          width={300}
          height={300}
          stackBy="x">
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis title="Total Clicks"/>
          <YAxis title="Total Links" />
          <BarSeries
            data={[
              {y: 2, x: 10},
              {y: 4, x: 5},
              {y: 5, x: 15}
            ]}
          />
          <BarSeries
            data={[
              {y: 2, x: 12},
              {y: 4, x: 2},
              {y: 5, x: 11}
            ]}/>
        </XYPlot>
      </div>
    );
  }
}