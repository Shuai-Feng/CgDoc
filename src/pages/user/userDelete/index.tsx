import  React from 'react';
import { Table,Card,Button,Form,DatePicker,message,Modal,Divider,Typography,Input} from 'antd';
import { FormInstance } from 'antd/lib/form';

const FormItem = Form.Item;
const { Title, Paragraph, Text } = Typography;


import Axios from '@/utils/axios';


export interface IUserStateProps {
}

export interface IUserStateState {
  dataSource:Array<any>,
  isModalVisible:boolean,
  record:any
}

export default class UserState extends React.Component<IUserStateProps, IUserStateState> {

  state = {
    dataSource:[],
    isModalVisible:false,
    record:{
      patient_id:'',
      patient_name:'',
      bed_num:'',
      medic_dept:''
    }
  }

  formRef = React.createRef<FormInstance>();


  //初始化表格数据加载
  requestList = async ()=>{
    let dataList:any = await Axios.ajax({url:"/patient/list",data:{}})
    dataList.result.forEach((item:any,index:number)=>{
      item.key = index
    })
    this.setState({
      dataSource:dataList.result
    })

  }

  //表格数据筛选
  requestFilterList = async ()=>{
    let myForm = this.formRef.current
    try{
      //这是个有意思的方法，代表没有就是null
      let filterData =  await myForm?.validateFields();
      let dataList:any =  await Axios.ajax({url:"/patient/list",data:{
        params:{
          ...filterData
      }}})
      dataList.result.forEach((item:any,index:number)=>{
        item.key = index
      })
      this.setState({
        dataSource:dataList.result
      })
  
    }catch(error){
      message.warning("表单不对哦")
    }
  }

  resetFields = ()=>{
    this.formRef.current?.resetFields();
    this.requestList();
  }


  handleLeave = (record:any)=>{
    this.setState({
      isModalVisible:true,
      record
    })
  }
  requestLeave = ()=>{
    let { record } = this.state;
    Axios.ajax({url:'/patient/leave',data:{
      params:{
        patient_id:record.patient_id
      }
    }}).then(res=>{
      message.success("出院成功")
      this.setState({
        isModalVisible:false
      })
      this.requestList()
    })

  }
  componentDidMount(){
    this.requestList()
  }

  public render() {
    let { dataSource,record } = this.state;
    const columns = [
      {
        title:'患者ID',
        key:'patient_id',
        dataIndex:'patient_id'
      },
      {
        title:'患者姓名',
        key:'patient_name',
        dataIndex:'patient_name'
      },
      {
        title:'患者床号',
        key:'bed_num',
        dataIndex:'bed_num',
        render:(value:any)=>{
          return value+'号床'
        }
      },
      {
        title:'患者年龄',
        key:'patient_age',
        dataIndex:'patient_age'
      },
      {
        title:'入院日期',
        key:'regin_time',
        dataIndex:'regin_time'
      },
      {
        title:'所属科室',
        key:'medic_dept',
        dataIndex:'medic_dept'
      },{
        render:(text:any, record:any, index:any)=>{
          return <Button onClick={()=>{this.handleLeave(record)}}>出院</Button>
        }
      }
    ]

    return (
      
      <div>
        <Card
          style={{marginBottom:10}}
        >
          <Form ref={this.formRef} layout='inline'>
              <FormItem
                label={'患者姓名'}
                name={'patient_name'}
                key={'patient_name'}
              
              >
                <Input/>
              </FormItem>
              <FormItem
                label={'起始时间'}
                name={'start_time'}
                key={'start_timde'}
               
              >
                <DatePicker/>
              </FormItem>
              <FormItem
                label={'~'}
                name={'end_time'}
                key={'end_time'}
          
              >
                <DatePicker/>
              </FormItem>
              <FormItem>
                  <Button style={{marginRight:10}} type='primary' onClick={this.requestFilterList}>查询</Button>
                  <Button type='primary' onClick={this.resetFields}>清空</Button>
              </FormItem>
          </Form>
        </Card>

        <div style={{padding:10,background:'#fff'}}>
          <Table
            columns={columns}
            dataSource={dataSource}
            scroll={document.documentElement.clientWidth<800?{x:'100%'}:{}}
          />
        </div>
        <Modal
          visible={this.state.isModalVisible}
          //@ts-nocheck
          title={`请确定,是否让 ${record.patient_id || ''} 办理离院手续?`}
          okText={'确定出院'}
          okType='danger'
          cancelText='取消'
          onOk={
            this.requestLeave
          }
          onCancel={()=>{
              this.setState({
                isModalVisible:false
              })
          }}
        >

          <p>
            <p>患者姓名:{record.patient_name || ''}</p>
            <p>床号:{record.bed_num||''}</p>
            <p>患者科室:{record.medic_dept||''}</p>
          </p>
         
          <Divider />
          <Typography>
            <Title>出院须知</Title>
            <Paragraph>
              After massive project practice and summaries, Ant Design, a design language for background
              applications, is refined by Ant UED Team, which aims to
              <Text strong>
                uniform the user interface specs for internal background projects, lower the unnecessary
                cost of design differences and implementation and liberate the resources of design and
                front-end development
              </Text>.
            </Paragraph>
          </Typography>
        </Modal>
      </div>
    );
  }
}
