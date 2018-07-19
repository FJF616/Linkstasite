import { BarChart } from 'react-easy-chart';
import React, { Component } from 'react';
import { base } from '../rebaseConfig/firebase';

class ClickGraph extends Component {
    state = {
        data: []
    }


componentWillMount() {
    base.bindToState('stats', {
        context: this,
        state: 'data'
    });
}

render() {
    const { data: { link, clicks } } = this.state;
    return(
        <div>
            <BarChart
                height={150}
                width={350}
                colorBars
                data={[
                    {
                    x : 'A',
                    y : 2
                    }
                ]}
                />
        </div>
    )
}
}
export default ClickGraph;