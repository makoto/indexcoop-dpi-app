import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush,
} from 'recharts';

export default function(props) {
  const {data, xKey, yKeys, brush, axis } = props
  const colors = [
    '#8884d8', '#82ca9d'
  ]
  return (
    <LineChart
      width={1000}
      height={400}
      data={data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
      syncId="anyId"
    >
      <CartesianGrid strokeDasharray="3 3" />
      {axis && (<XAxis dataKey={xKey} />)}
      <YAxis domain={['auto', 'auto']}/>
      <Tooltip />
      <Legend />
      {yKeys.map((yKey, index) => {
        return (<Line type="monotone" dataKey={ yKey } stroke={colors[index]} />)
      })}
      {brush && (<Brush />)}
    </LineChart>
  );
}
