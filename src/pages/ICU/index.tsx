import React, { useEffect } from 'react';
import axios from 'axios';
import { useRequest } from 'ahooks';
// 给组件引进来
import menuConfig from './menuConfig';
import TotalTree from './components/TotalTree';
import { Chart, Interval, Annotation } from 'bizcharts';

interface IICUpageProps {}

const ICUpage: React.FunctionComponent<IICUpageProps> = props => {
  function getUsername(): Promise<string> {
    return new Promise(resolve => {
      axios.get('https://randomuser.me/api').then(res => {
        resolve(res.data.results[0].phone);
      });
    });
  }

  const data = [
    { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
    { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
    { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
    { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
    { name: 'London', 月份: 'May', 月均降雨量: 47 },
    { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
    { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
    { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
    { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
    { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
    { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
    { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
    { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
    { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
    { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
    { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
  ];

  useEffect(() => {
    axios.get('https://randomuser.me/api').then(res => {
      console.log(res.data.results[0].phone);
    });
  }, []);
  const { data: myDate, loading, run, cancel } = useRequest(getUsername, {
    pollingInterval: 1000,
    pollingWhenHidden: false,
  });

  useEffect(() => {}, []);

  return (
    <div className="ICU_page">
      <TotalTree />
    </div>
  );
};

export default ICUpage;
