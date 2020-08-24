import React,{ useState,useEffect } from 'react';
import { Table,Card,Button,message,Modal,Tree} from 'antd';
import Axios from '@/utils/axios';

//定义医生实例的属性
interface doctorProps{
  doctor_id:string
  doctor_Name:string
}


interface IDoctorProps {

}

const Doctor: React.FunctionComponent<IDoctorProps> = (props) => {
  
  const [doctorList,setDoctor] = useState();
  const [isAuthVisible,setAuthVisible] = useState(false);

  const columns = [
    {
      title:"医生Id",
      key:'doctor_id',
      dataIndex:'doctor_id',
    },
    {
      title:"医生姓名",
      key:'doctor_name',
      dataIndex:'doctor_name',
    },
    {
      title:"所属部门",
      key:'doctor_dept',
      dataIndex:'doctor_dept',
    }
  ]
  // 请求医生列表
  let requestList =  async ()=>{
      try{
        let datalist:any = await Axios.ajax({url:"/doctor/list",data:{
          params:{
  
          }
        }})
        datalist.result.item_list.forEach((item:any,index:number)=>{
          item.key = index
        })
        setDoctor(datalist.result.item_list)
        
      }catch(error){
        message.warning(error)
      }
  
  }

  useEffect(()=>{
    requestList()
  },[])

  return <div className='doctor'>
    <Card>
      <Button style={{marginRight:10}} type='primary'>创建医生</Button>
      <Button style={{marginRight:10}} type='primary' onClick={()=>{setAuthVisible(true)}}>权限设置</Button>
      <Button type='primary'>病人分配</Button>
    </Card>
    <Table
    columns={columns} dataSource={doctorList} bordered
    />
    <Modal
      visible={isAuthVisible}
      onCancel={()=>{
        setAuthVisible(false)
      }}
    >
      
    </Modal>
  </div> ;  
};

export default Doctor;
