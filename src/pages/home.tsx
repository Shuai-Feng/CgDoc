import * as React from 'react';
import { Card,Row,Col } from 'antd';
import { Line,Liquid } from '@ant-design/charts';
interface IHomeProps {
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  const Option1 = {
    data:[
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
    title:{
      visible:true,
      text:"帅锋使用G2",
    },
    xField: 'year',
    yField: 'value'
  }
  const waterOption = {
    title: {
      visible: true,
      text: '水波图',
    },
    description: {
      visible: true,
      text: '水波图 - 百分比显示',
    },
    min: 0,
    max: 10000,
    value: 5639,
    statistic: { formatter: (value:number) => ((100 * value) / 10000).toFixed(1) + '%' },
  };
  const layout_l = {
    sm:{
      span:24
    }
  }
  const layout_r = {
    sm:{
      span:12
    }
  }

  return <div>

    <Row gutter={[10,10]}>
      <Card style={{marginBottom:10}}>欢迎医生,今天也要加油噢</Card>
      <Col {...layout_l}>
        <Line style={{background:"#fff",marginBottom:10}} {...Option1}/>
        <Line style={{background:"#fff"}} {...Option1}/>
      </Col>
      <Col {...layout_r}>
        <Liquid style={{background:"#fff"}} {...waterOption}  />
      </Col>
    </Row>
    
  </div> ;
};

export default Home;
