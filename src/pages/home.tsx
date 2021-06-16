import * as React from 'react';
import { Card, Row, Col } from 'antd';
// import { Liquid,Column,TinyLine} from '@ant-design/charts';
//如果你这姐引入的话，所有的图表都会被引入进来
import { jsPDF } from 'jspdf';

import Line from '@ant-design/charts/es/line';
import Liquid from '@ant-design/charts/es/liquid';
import Column from '@ant-design/charts/es/column';
import TinyLine from '@ant-design/charts/es/tinyLine';

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = props => {
  const randomData = (num: number, max: number, min: number) => {
    const data = [];
    for (let i = 0; i < num; i++) {
      data.push({ index: String(i), value: min + Math.random() * (max - min) });
    }
    return data;
  };
  const Option1 = {
    data: [
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 7 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 },
    ],
    title: {
      visible: true,
      text: '用户经济水平报告',
    },
    xField: 'year',
    yField: 'value',
  };
  const Option2 = {
    data: [
      { day: '周一', num: 3 },
      { day: '周二', num: 4 },
      { day: '周三', num: 4 },
      { day: '周四', num: 5 },
      { day: '周五', num: 6 },
      { day: '周六', num: 6 },
      { day: '周日', num: 6 },
    ],
    title: {
      visible: true,
      text: '近一周病房入住数量概况',
    },
    xField: 'day',
    yField: 'num',
  };
  const tinyOption = {
    height: 80,
    padding: 10,
    data: randomData(50, 10, 1000),
    xField: 'index',
    yField: 'value',
    guideLine: [
      {
        type: 'mean',
        text: {
          position: 'start',
          content: '平均值',
          style: {
            stroke: 'white',
            lineWidth: 2,
          },
        },
      },
    ],
  };
  const waterOption = {
    title: {
      visible: true,
      text: '当前空余床位 5639',
    },
    description: {
      visible: true,
      text: '空余床位 - 百分比显示',
    },
    min: 0,
    max: 10000,
    value: 5639,
    statistic: {
      formatter: (value: number) => ((100 * value) / 10000).toFixed(1) + '%',
    },
  };
  const layout_l = {
    sm: 24,
    md: 18,
  };
  const layout_r = {
    sm: 24,
    md: 6,
  };

  return (
    <div>
      <Row gutter={[10, 10]}>
        <Card style={{ marginBottom: 10, width: '100%' }}>
          欢迎{'老大'},今天也要加油噢
        </Card>
        <Col {...layout_l}>
          <Line
            style={{ background: '#fff', height: 300, marginBottom: 10 }}
            {...Option1}
          />

          <Column style={{ background: '#fff' }} {...Option2} />
        </Col>
        <Col {...layout_r}>
          <TinyLine
            style={{
              background: '#fff',
              marginBottom: 10,
              overflow: 'hidden',
            }}
            {...tinyOption}
          />
          <div
            id="pdfchart"
            onClick={() => {
              const mycan = document.querySelector('#pdfchart canvas');
              if (mycan) {
                // console.log(mycan);
                console.log(mycan.toDataURL('images/png'));
                let height =
                  mycan.style.height.substr(0, mycan.style.height.length - 2) -
                  0;
                let width =
                  mycan.style.width.substr(0, mycan.style.width.length - 2) - 0;
                debugger;
                const doc = new jsPDF({
                  orientation: width > height ? 'landscape' : 'portrait',
                  unit: 'px',
                  format: [width, height],
                });

                doc.addImage(
                  mycan.toDataURL('images/jpeg'),
                  'jpeg',
                  0,
                  0,
                  width,
                  height,
                );
                doc.save('a4.pdf');
              }
            }}
          >
            <Liquid
              style={{ background: '#fff', marginBottom: 10 }}
              {...waterOption}
            />{' '}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
