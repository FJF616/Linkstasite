import React from 'react';
import { base } from '../rebaseConfig/firebase';
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
componentWillMount() {
  this.bitlyDataRef = base.syncState(`bitlyData`, {
    context: this,
    state: 'graphData',
  })
 
}

totalClicks = async () => {
  let total;
  try {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const { graphData } = this.state;
    const clicks = await Object.keys(graphData).map(key => {
      key = graphData[key];
      return key.clicks;
    });
     total = await clicks.reduce(reducer);
     console.log('total clicks', total)
      return (total);
    } catch (error) {
      console.log(error)
  }
  
}

totalLinks = async () => {
  try {
    let linksArr =[];
    const { graphData } = this.state;
    const links = await Object.keys(graphData).map(key => {
      key = graphData[key];
      linksArr.push(key.url);
      return links
    });
    let total = await linksArr.length;
    console.log('total links:', total)
    return total;
  } catch (error) {
    console.log(error)
  }
}
 
  componentWillUnmount() {
    base.removeBinding(this.bitlyDataRef);
  }
  
  
  

    render() {
    console.log(this.totalLinks())
    console.log(this.totalClicks())
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