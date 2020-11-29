import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default function(props) {
  const {data, xKey, yKey0, yKey1 } = props
  return (
    <LineChart
      width={1000}
      height={800}
      data={data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={xKey} />
      <YAxis domain={['auto', 'auto']}/>
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey={ yKey0 } stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey={ yKey1 } stroke="#82ca9d" />
    </LineChart>
  );
}
