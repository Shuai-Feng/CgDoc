import * as React from 'react';
import EchartReact from 'echarts-for-react';
//@ts-ignore
import { EChartOption } from 'echarts' ;
import { Card,Badge } from 'antd';
const Grid = Card.Grid;

import './charttheme/macarons.js'

import  './style.less';
interface medicData {
  medicName:string,
  medicState:number,
  medicNum:number,
  medicImg:string,
  medicStatus:string
}
export interface IMedicCardProps {
  width?:number,
  chartOptioin?:any,
  medicData:medicData,
  chartData:any,
  onClick?:Function
}

export default class MedicCard extends React.Component<IMedicCardProps> {
  getOption() {
    //在这里 如果你导入 EChartOption的接口的话，就不用担心写错啦
    let { chartData,medicData } = this.props;
    let option: EChartOption = {
      title: {
        text: medicData.medicName+'订单',
        top:"5%",
        left:"3%"
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        axisLabel:{
          show:false
        }
      },
      yAxis: {
        type: 'value',
        axisLabel:{
          show:false
        }
      },
      grid:{
        top:"24%",
        bottom:"15%",
        left:"10%",
        right:"10%"
      },
      series: [
        {
          name: '订单量',
          type: 'line',
          data: chartData || [1000, 2000, 1500, 3000, 2000, 1200, 800],
        },
      ],
    };
    return option;
  }
  public render() {
    let { medicData} = this.props;
    return (
      <Card
        title={<span>
          {medicData?
          <span>
            {medicData.medicName+'  '}
            {
              !medicData.medicStatus?
              <Badge style={{float:'right'}} color="#f50" text={'需要补货'}/>:""
            }
          </span>
          :'未知名称'}
        </span>}
        onClick={()=>{
          if(this.props.onClick){
            this.props.onClick()
          }
        }}
      >
        <div className='medicCard'>
            <div className="overlay"/>
            <img className='medicImg' src={medicData?medicData.medicImg:"https://api.r10086.com/风景系列1.php"} alt=''/>
            <div className="medic_name">
              <p>{medicData?medicData.medicName:'未知状态'}</p>
            </div>
            <div className='medic_state'>
              <p>药品状态</p>
              <p>{medicData?medicData.medicState:'未知状态'}</p>
            </div>
            <div className='medic_number'>
              <p>出售数量</p>
              <p>{medicData?medicData.medicNum:'未知数量'}</p>
            </div>
            <EchartReact className='medic_chart' 
              style={{height:160,position:"absolute",background:"#fff"}} 
              option={this.getOption()}
              theme={'macarons'}
            />
        </div>
      </Card>
    );
  }
}
