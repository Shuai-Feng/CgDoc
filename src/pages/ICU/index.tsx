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

  let treeArray = [
    {
      id: 1,
      nodeName: 'a',
      children: [
        {
          id: 11,
          nodeName: 'ab',
          children: [
            {
              id: 111,
              nodeName: 'abc',
            },
            {
              id: 112,
              nodeName: 'abd',
            },
          ],
        },
        {
          id: 12,
          nodeName: 'ac',
          children: [
            {
              id: 121,
              nodeName: 'aca',
            },
          ],
        },
      ],
    },
    {
      id: 2,
      nodeName: 'b',
    },
    {
      id: 3,
      nodeName: 'c',
      children: [
        {
          id: 31,
          nodeName: 'cb',
          children: [
            {
              id: 311,
              nodeName: 'cbc',
            },
            {
              id: 312,
              nodeName: 'cbd',
            },
          ],
        },
        {
          id: 32,
          nodeName: 'cc',
          children: [
            {
              id: 321,
              nodeName: 'cca',
            },
          ],
        },
      ],
    },
    {
      id: 4,
      nodeName: 'd',
    },
  ];

  const dfsPath = (tree: any[], key: string) => {
    let nodePathArray = [];

    // (tree为目标树，targetId为目标节点id)
    function getNodeRoute(tree, targetId) {
      for (let index = 0; index < tree.length; index++) {
        if (tree[index].children) {
          let endRecursiveLoop = getNodeRoute(tree[index].children, targetId);
          if (endRecursiveLoop) {
            nodePathArray.push(tree[index].id);
            return true;
          }
        }
        if (tree[index].id === targetId) {
          nodePathArray.push(tree[index].id);
          return true;
        }
      }
    }
    getNodeRoute(tree, key);

    return nodePathArray;
  };

  useEffect(() => {
    axios.get('https://randomuser.me/api').then(res => {
      console.log(res.data.results[0].phone);
    });
  }, []);

  const { data: myDate, loading, run, cancel } = useRequest(getUsername, {
    pollingInterval: 1000,
    pollingWhenHidden: false,
  });

  useEffect(() => {
    console.log(dfsPath(treeArray, 321));
  }, []);

  return (
    <div className="ICU_page">
      <TotalTree />
    </div>
  );
};

export default ICUpage;
