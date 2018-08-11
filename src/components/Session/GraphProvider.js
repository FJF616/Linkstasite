import React, { Component } from 'react';
import GraphContext from './GraphContext';
import { base } from '../rebaseConfig/firebase';


class GraphProvider extends Component {
    state = {
        graphData:{},
        totalClicks : async() => {
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
            
          },
          
          totalLinks : async() => {
            let total;
            try {
              let linksArr =[];
              const { graphData } = this.state;
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
    };

    componentDidMount() {
        base.fetch('bitlyData', {
            context: this,
            state: 'graphData',
        }).then(graphData => {
            this.setState({
                graphData
            })
            console.log('successfully fetched graphData')
        }).catch(error => {
            console.log('error fetching graphData', error)
        })
        
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