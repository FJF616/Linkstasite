import React from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalRectSeries
} from 'react-vis';

const timestamp = new Date().getTime();
const ONE_DAY = 86400000;

const DATA = [
  {x0: ONE_DAY * 2, x: ONE_DAY * 3, y: 1},
  {x0: ONE_DAY * 7, x: ONE_DAY * 8, y: 1},
  {x0: ONE_DAY * 8, x: ONE_DAY * 9, y: 1},
  {x0: ONE_DAY * 9, x: ONE_DAY * 10, y: 2},
  {x0: ONE_DAY * 10, x: ONE_DAY * 11, y: 2.2},
  {x0: ONE_DAY * 19, x: ONE_DAY * 20, y: 1},
  {x0: ONE_DAY * 20, x: ONE_DAY * 21, y: 2.5},
  {x0: ONE_DAY * 21, x: ONE_DAY * 24, y: 1}
].map(el => ({x0: el.x0 + timestamp, x: el.x + timestamp, y: el.y}));

export default class Graph extends React.Component {
  render() {
    return (
      <XYPlot
        style={{border: '2px  outset', borderColor: 'pink', padding: '5px', margin: '22px'}}
        xDomain={[timestamp - 2 * ONE_DAY, timestamp + 30 * ONE_DAY]}
        yDomain={[0.0, 5]}
        xType="time"
        width={1650}
        height={450} >
        <VerticalGridLines style={{stroke:'black'}}/>
        <HorizontalGridLines style={{stroke:'black'}}/>
        <XAxis style={{stroke: 'black', }}/>
        <YAxis sstyle= {{stroke: '5px black'}}/>
        <VerticalRectSeries data={DATA} style={{stroke: '#fff'}}/>
      </XYPlot>
    );
  }
}
