import React, { Component } from 'react';
import GraphContext from './GraphContext';
import { base } from '../rebaseConfig/firebase';


class GraphProvider extends Component {
    state = {
        graphData:{},
    };
        totalClicks = async(obj) => {
            // let total;
            let clickArr =[];
            try {
              
              const { obj } = this.state;
              const click = await Object.keys(obj).map(key => {
                key = obj[key];
                
                clickArr.push(key.clicks)
                return click;
              });
              console.log(click)
                // total = await clickArr.reduce((a, b) => a + b, 0 );
                // console.log('total clicks', total)
                //     return (total);
                } catch (error) {
                    console.log(error)
            }
            
          }
        
        //   totalLinks = async() => {
        //     let total;
        //     try {
        //       let linksArr =[];
        //       const { graphData } = this.state;
        //       const links = await Object.keys(graphData).map(key => {
        //         key = graphData[key];
        //         linksArr.push(key.url);
        //         return links
        //       });
        //         total = await linksArr.length;
        //         console.log('total links:', total)
        //         return total;
        //         } catch (error) {
        //         console.log(error)
        //     }
        //   }
   

    componentDidMount() {
        base.fetch('bitlyData', {
            context: this,
            state: 'graphData',
        }).then(graphData => {
            this.setState({
               graphData
            })
            console.log('successfully fetched graphData', graphData)
        }).catch(error => {
            console.log('error fetching graphData', error)
            })
            console.log(this.totalClicks(this.state.graphData));
    
    }

   
    render() {
      
        return (
            <GraphContext.Provider value={ this.state } >
                {this.props.children}
            </GraphContext.Provider>
        )
    }
}

export default GraphProvider;