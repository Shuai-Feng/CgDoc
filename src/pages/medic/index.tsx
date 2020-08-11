import * as React from 'react';
import MedCard from './components/MedicCard';
import Axios from '@/utils/axios';
import { Card,Button,Row,Col } from 'antd';

export interface MedicProps {
  
}
export interface MedicState {
  medic_list:Array<any>
}

export default class Medic extends React.Component<MedicProps,MedicState> {
  state = {
    medic_list:[]
  }
  requestList = ()=>{
    Axios.ajax({url:"/medic/status",data:{}}).then((res:any)=>{
      this.setState({
        medic_list:res.result
      })
    })
  }
  componentDidMount(){
    this.requestList()
  }
  handleRequest=()=>{
    this.requestList()
  }
  public render() {
    let { medic_list } = this.state;
    return (
      <div>
          <Card style={{marginBottom:'20px'}}>
            <Button  type='primary' onClick={this.handleRequest}>数据刷新</Button>
          </Card>
          <Card  style={{marginBottom:20,position:"relative"}}>
            <Row gutter={[26,10]}>
              {
                medic_list.map((item:any)=>{
                  return <Col span={8}>
                    <MedCard key={item.medic_id}
                    medicData={{medicName:item.medic_name,medicNum:item.medic_num,medicState:item.medic_type,medicImg:item.medic_img}} 
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
