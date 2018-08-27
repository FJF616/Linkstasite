import React from 'react';
// import ReactDOM from 'react-dom';
import ChartistGraph from 'react-chartist';
import { max } from '../../../node_modules/moment';
import BitlyHelper from '../../util/BitlyHelper';
import ChartistAccessibility from 'react-chartist-plugin-accessibility'
 
class Pie extends React.Component {
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
   const shortLinks=this.getLinks();
   var newArr=[];
  for (let i = 0; i < shortLinks.length; i++) {
      let shortlink = shortLinks[i]
      newArr.push(BitlyHelper.expandLink(shortlink))
    }
  
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
    console.log(this.getLongLinks());
    console.log(this.getLinks())
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
      low: 0,
      strokeWidth: '45px',
      seriesBarDistance: 10,
      axisX: {
        offset: 60,
        labelInterpolationFnc: function(value, index) {
          return index % 2 === 0 ? value : '/\n' + value  
        }, 
      },
       
      
     
    };
    
    var type = 'Bar'
 
    return (
      <div >
        <ChartistGraph style={{
            display: 'flex', 
            margin: 67, 
            marginLeft: 95, 
            marginTop: 30,  
            height: 480, 
            width:1230,
            padding: '450 102 102 0',  
            minHeight: 55, 
            minWidth: 455, 
            border: '3.5px outset',
            borderColor: 'silver',
            backgroundColor: 'white'
          }} 
          responsiveOptions ={[
            ['screen and (max-width: 768px)', {
                width: '100%',
              }],
            ]}
       
          className={'ct-series-f ct-line'} 
          data={data} 
          options={options} 
          type={type} 
        > 
      
      
        </ChartistGraph>

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
// .ct-series-a .ct-line {
//   stroke: black;
//   stroke-width: 4px;
// }