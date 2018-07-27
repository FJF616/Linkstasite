import { Area, CirclePie, BarMetric } from 'react-simple-charts';
import React from 'react'; 
const data = [
    {time:1422766800000, value: 0, label: "active users"},
    {time:1422853200000, value: 10, label: "active users"},
    {time:1422939600000, value: 5, label: "active users"}
];

const AreaGraph = () => (
    <Area width={900} height={300} data={data}/>
)

export default AreaGraph;