import * as React from 'react';
import { Card, Row, Col } from 'antd';
import {
  DualAxes,
  Column,
  Liquid,
  Line,
  ColumnConfig,
} from '@ant-design/charts';
//如果你这姐引入的话，所有的图表都会被引入进来

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  const randomData = (num: number, max: number, min: number) => {
    const data = [];
    for (let i = 0; i < num; i++) {
      data.push({ index: String(i), value: min + Math.random() * (max - min) });
    }
    return data;
  };
  const col_conf: ColumnConfig = {
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
    xField: 'year',
    yField: 'value',
    appendPadding: 20,
  };
  const line_conf = {
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
    appendPadding: 20,
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
    percent: 0.25,
    outline: {
      border: 4,
      distance: 8,
    },
    wave: { length: 128 },
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
          <Column
            style={{ background: '#fff', height: 300, marginBottom: 10 }}
            {...col_conf}
          />
          <Line
            style={{ background: '#fff', height: 300, marginBottom: 10 }}
            {...line_conf}
          ></Line>
        </Col>
        <Col {...layout_r}>
          <Liquid
            style={{ background: '#fff', marginBottom: 10 }}
            {...waterOption}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
