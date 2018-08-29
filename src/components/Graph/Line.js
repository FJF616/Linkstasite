import React from 'react';
// import ReactDOM from 'react-dom';
import ChartistGraph from 'react-chartist';
// import { max } from '../../../node_modules/moment';
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
    var lineChartOptions = {
      low: 0,
      showArea: true,
   
  
      high: Math.max.apply(this, clickTotals),
      // low: Math.min.apply(this, clickTotals),
      axisX: {
        offset: 100,
        labelInterpolationFnc: function(value, index) {
          return  index % 2 === 0 ? value : '/\n' + value;  
         
      
      }
    }
    };
 
    var type = 'Line'
 
    return (
      <div>
      
        <ChartistGraph style={{display: 'flex', backgroundColor: 'white', marginLeft: 95, marginTop: 30,  padding: 220, paddingRight: 1000, height: 180, width:430, minHeight: 55, minWidth: 205,border: '3.5px outset', borderColor:'silver'}} className={'ct-series-g ct-line ct-octave'} data={data} options={lineChartOptions} type={type} />
      </div>
    )
  }
}
export default Line


