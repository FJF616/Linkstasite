import React from 'react';
import ReactDOM from 'react-dom';
import ChartistGraph from 'react-chartist';
import { max } from '../../../node_modules/moment';
 
class Pie extends React.Component {
  
  
  getLinks = () => {
    let linkArr = [];
    const { graphData } = this.props;
    for(let key in graphData) {
      const link = graphData[key].url
      linkArr.push(link)
    }
      return linkArr;
    }
    
  getClicks = () => {
    let clickArr = [];
    const { graphData } = this.props;
    for(let key in graphData) {
      const clicks = graphData[key].clicks
      clickArr.push(clicks)

    } 
    return clickArr;
  }
  
  
  render() {
    console.log(this.getClicks())
    const dataLabels = this.getLinks();
    const clickTotals = this.getClicks();
    var data = {
      labels: dataLabels,
      series: [clickTotals]
    };
 
    var options = {
      high: Math.max.apply(this, clickTotals),
      low: 0,
      // axisY: {
      //   labelInterpolationFnc: function(value, index) {
      //     return index %  === 0 ? value : null;
      //   }, 
      
      // }
    };
 
    var type = 'Bar'
 
    return (
      <div>
        <ChartistGraph style={{display: 'flex', marginLeft: 95, marginTop: 30,  padding: 450, height: 'auto', width: 'auto', maxWidth: 795, maxHeight: 375, minHeight: 55, minWidth: 205,border: '2px outset'}} className={'ct-octave'} data={data} options={options} type={type} />
      </div>
    )
  }
}
export default Pie





// new Chartist.Line('.ct-chart', {
//     labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
//     series: [
//       [12, 9, 7, 8, 5],
//       [2, 1, 3.5, 7, 3],
//       [1, 3, 4, 5, 6]
//     ]
//   }, {
//     fullWidth: true,
//     chartPadding: {
//       right: 40
//     }
//   });
  