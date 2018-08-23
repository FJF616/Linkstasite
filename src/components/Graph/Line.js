import React from 'react';
import ReactDOM from 'react-dom';
import ChartistGraph from 'react-chartist';
import { max } from '../../../node_modules/moment';
import BitlyHelper from '../../util/BitlyHelper';
 
class Line extends React.Component {
  state = {}
  
  getLinks = () => {
    let linkArr = [];
    const { graphData } = this.props;
    for(let key in graphData) {
      const link = graphData[key].url
      linkArr.push(link)
    }
      return linkArr;
    }
  getLongLinks = () => {
   const shortLinks = this.getLinks();
   var newArr=[];
  for (let i = 0; i < shortLinks.length; i++) {
      newArr.push(BitlyHelper.expandLink(shortLinks[i]))
    }
   console.log(newArr)
    return newArr
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
  componentDidMount() {
    this.getLongLinks();
    
  }
  
  render() {
   
   
    const dataLabels = this.getLinks();
    const clickTotals = this.getClicks();
    var data = {
      labels: dataLabels,
      series: [clickTotals]
    };
 
    var options = {
      high: Math.max.apply(this, clickTotals),
      low: Math.min.apply(this, clickTotals),
      axisX: {
        labelInterpolationFnc: function(value, index) {
          return index % 1 === 0 ? value : null;
        }, 
      
      }
    };
 
    var type = 'Line'
 
    return (
      <div>
        <ChartistGraph style={{display: 'flex', marginLeft: 95, marginTop: 30,  padding: 320, height: 580, width: 1080, minHeight: 55, minWidth: 205,border: '3.5px outset', borderColor:'gold'}} className={'ct-octave'} data={data} options={options} type={type} />
      </div>
    )
  }
}
export default Line


