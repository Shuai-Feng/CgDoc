import * as React from 'react';
import { Table } from 'antd';

interface IICUpageProps {}

const ICUpage: React.FunctionComponent<IICUpageProps> = props => {
  const data = [
    { type: '甲(妇产科)', sum: 10, avg: 3 },
    { type: '已(妇产科)', sum: 21, avg: 2 },
    { type: '丙(妇产科)', sum: 23, avg: 1 },
    { type: '甲(男科)', sum: 10, avg: 6 },
    { type: '已(男科)', sum: 21, avg: 6 },
    { type: '丙(男科)', sum: 23, avg: 6 },
  ];

  const target = ['妇产科', '男科'];

  let chartData = {};

  // 每一个类别都需要遍历
  target.forEach(_t => {
    // 科室初始化   分配基础空房间
    // chartData[_t] = [];

    chartData[_t] = data.filter(item => item.type.includes(_t));
    // 遍历
    // data.forEach(item => {
    //   if (item.type.includes(_t)) {
    //     chartData[_t].push(item);
    //     // 这一步可以尝试让已分配出队  减少遍历时间
    //     // 从 data 中 把找到的扔出去
    //   }
    // });
  });

  console.log(chartData); // 就差一步了 你需要让他们求和

  let result = Object.keys(chartData).map(key => {
    // 拿出所有科室的医生
    let currentData = chartData[key];
    let sum = 0; // 求和
    let avg = 0; // 求均值

    currentData.forEach(item => {
      sum += item.sum;
      avg += item.avg;
    });

    //
    if (currentData.length) {
      avg = avg / currentData.length;
    }
    return {
      type: key,
      sum,
      avg,
    };
  });

  console.log(result);
  debugger;

  return (
    <div>
      icuPage
      <Table />
    </div>
  );
};

export default ICUpage;
