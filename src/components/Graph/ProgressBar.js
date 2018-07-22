import React, { Component } from 'react';
import { Progress } from 'react-sweet-progress';
import 'react-sweet-progress/lib/style.css';
import { base } from '../rebaseConfig/firebase';
// import MicrolinkCard from 'react-microlink';

class ProgressBar extends Component {
    state = {
        data: []
    };

    
    // componentWillMount() {
    //     base.bindToState('stats', {
    //         context: this,
    //         state: 'data'
    //     });
    // }

    render() {
        return(
            <div>
            <Progress style={{width:'232px'}}
                type="bar" 
                percent={this.props.data.clicks }
                status="success"
               
                />
                </div> 
        );
    };
}

export default ProgressBar;