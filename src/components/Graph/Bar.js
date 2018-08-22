import React from 'react';
// import { base } from '../rebaseConfig/firebase';
// import Button from 'mdbreact'

// import GraphProvider from '../Session/GraphProvider';
// import GraphContext from '../Session/GraphContext';
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
    useCanvas: false,
   
}


totalClicks = async () => {
  let total;
  try {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const  graphData  = {...this.props.graphData};
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
  let total;
  
  try {
    let linksArr =[];
    const  graphData  = {...this.props.graphData};
    const links = await Object.keys(graphData).map(key => {
      key = graphData[key];
      linksArr.push(key.url);
      return links
    });
    total = await linksArr.length;
    console.log('total links:', total)
    return total;
  } catch (error) {
    console.log(error)
  }
 
}
 graphInfo = () => {
   const { graphData } = this.props;
   const length =  Object.keys(graphData).length;
   const plot = Object.keys(graphData).map(key => {
    for ( let i=0; i<length; i++ ) {
     return ({ y: i , x: `${key.clicks}` })
    }
    console.log(plot)
    return plot
   })
   
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
          width={850}
          height={300}
          stackBy="x">
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis title="Total Clicks"/>
          <YAxis title="Total Links" position="start"/>
          
           
           
          
          <BarSeries
            data={[
              {y: 'Link one', x: 12},
              {y: 4, x: 2},
              {y: 5, x: 11}
            ]}/>
        </XYPlot>
      </div>
   
    );
  }
}