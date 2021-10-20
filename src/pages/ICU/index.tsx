import * as React from 'react';
import { DualAxes } from '@ant-design/charts';

interface IICUpageProps {}

const ICUpage: React.FunctionComponent<IICUpageProps> = (props) => {
  var uvBillData = [
    {
      time: '2019-03',
      value: 350,
      type: 'uv',
    },
    {
      time: '2019-04',
      value: 900,
      type: 'uv',
    },
    {
      time: '2019-05',
      value: 300,
      type: 'uv',
    },
    {
      time: '2019-06',
      value: 450,
      type: 'uv',
    },
    {
      time: '2019-07',
      value: 470,
      type: 'uv',
    },
    {
      time: '2019-03',
      value: 220,
      type: 'bill',
    },
    {
      time: '2019-04',
      value: 300,
      type: 'bill',
    },
    {
      time: '2019-05',
      value: 250,
      type: 'bill',
    },
    {
      time: '2019-06',
      value: 220,
      type: 'bill',
    },
    {
      time: '2019-07',
      value: 362,
      type: 'bill',
    },
  ];
  var transformData = [
    {
      time: '2019-03',
      count: 800,
    },
    {
      time: '2019-04',
      count: 600,
    },
    {
      time: '2019-05',
      count: 400,
    },
    {
      time: '2019-06',
      count: 380,
    },
    {
      time: '2019-07',
      count: 220,
    },
  ];
  var config = {
    data: [uvBillData, transformData],
    xField: 'time',
    yField: ['value', 'count'],
    geometryOptions: [
      {
        geometry: 'column',
        isGroup: true,
        seriesField: 'type',
      },
      {
        geometry: 'line',
        lineStyle: { lineWidth: 2 },
      },
    ],
  };
  return (
    <div>
      <DualAxes {...config} />
    </div>
  );
};

export default ICUpage;
