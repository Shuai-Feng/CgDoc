import * as React from 'react';
import MedCard from './components/Dy_medicCard';
import Axios from '@/utils/axios';
import { Card,Button,Row,Col,message } from 'antd';

export interface MedicProps {
  
}
export interface MedicState {
  medic_list:Array<any>,
  medic_supNum:number
}

export default class Medic extends React.Component<MedicProps,MedicState> {
  state = {
    medic_list:[],
    medic_supNum:0
  }
  requestList = ()=>{
    Axios.ajax({url:"/medic/status",data:{}}).then((res:any)=>{
      if(res.result){
        let itemList:any[] = res.result;
        let medic_supNum = 0;
        itemList.forEach(item=>{
          if(!item.medic_status){
            medic_supNum++
          }
        })
        this.setState({
          medic_list:res.result,
          medic_supNum
        })
      }
      
    })
  }
  componentDidMount(){
    this.requestList()
  }
  handleRequest=()=>{
    this.requestList()
  }
  public render() {
    let { medic_list,medic_supNum } = this.state;
    const layout = {
      md:8,
      sm:24
    }
    return (
      <div>
          <Card style={{marginBottom:'20px'}}>
            {/* <Row>
              <Col span={20}><Button  type='primary' onClick={this.handleRequest}>数据刷新</Button></Col>
              <Col span={2}><Button type='text'>需要补货asdfasd</Button></Col>
            </Row> */}
            <Button  type='primary' onClick={this.handleRequest}>数据刷新</Button>
          <Button style={{float:"right"}} type='text'>共{medic_supNum}个药品需要补货</Button>
          </Card>
          <Card  style={{marginBottom:20,position:"relative"}}>
            <Row gutter={[26,10]}>
              {
                medic_list.map((item:any)=>{
                  return <Col {...layout} key={item.medic_id}>
                    <MedCard 
                    // @ts-ignore
                    onClick={()=>message.info('点击了' + item.medic_name)}
                    medicData={{
                      medicName:item.medic_name,
                      medicNum:item.medic_num,
                      medicState:item.medic_type,
                      medicImg:item.medic_img,
                      medicStatus:item.medic_status
                    }} 
                    chartData={item.medic_sale}
                    />
                  </Col>
                })
              }
            </Row>
          </Card>
      </div>
    );
  }
}
