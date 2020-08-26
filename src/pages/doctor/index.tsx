import React,{ useState,useEffect } from 'react';
import { Table,Card,Button,message,Modal} from 'antd';
import Axios from '@/utils/axios';
import AuthPanel from './component/AuthPanel';
import RolePanel from './component/RolePanel';
import DocAddPanel from './component/DcAddPanel';
import Utils from '@/utils/util';

//定义医生实例的属性
// interface doctorProps{
//   doctor_id:string
//   doctor_Name:string
// }



interface IDoctorProps {

}

const Doctor: React.FunctionComponent<IDoctorProps> = (props) => {
  
  //当前医生信息列表
  const [doctorList,setDoctor] = useState();
  //医生权限分配模态框状态
  const [isAuthVisible,setAuthVisible] = useState(false);
  //患者分配模态框
  const [isRoleVisible,setRoleVisible] = useState(false);
  //医生添加模态框
  const [isAddVisible,setAddVisible] = useState(false);
  
  const [seletedItem,setItem] = useState()

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
  //设置权限if
  let handleAuthOpen = ()=>{
    if(!seletedItem){
      Modal.info({title:"请选择一条记录"});
      return 
    }
    setAuthVisible(true)
  }
  let handleRoleOpen = ()=>{
    if(!seletedItem){
      Modal.info({title:"请选择一条记录"});
      return 
    }
    setRoleVisible(true)
  }
  useEffect(()=>{
    requestList()
    //权限界面 关闭事件绑定
    Utils.ee_on('handle_close_auth',()=>{
      setAuthVisible(false)
      requestList()
    })
    Utils.ee_on('handle_close_role',()=>{
      setRoleVisible(false)
      requestList()
    })
    Utils.ee_on('handle_close_add',()=>{
      setAddVisible(false)
      requestList()
    })
  },[])

  return <div className='doctor'>
    <Card>
      <Button style={{marginRight:10}} onClick={()=>{setAddVisible(true)}} type='primary'>创建医生</Button>
      <Button style={{marginRight:10}} type='primary' onClick={()=>{handleAuthOpen()}}>权限设置</Button>
      <Button type='primary' onClick={()=>{handleRoleOpen()}}>病人分配</Button>
    </Card>
    <Table
    rowSelection={{
      type:'radio',
      onChange:(se_id,se_item)=>{
        setItem(se_item[0])
      }
    }}
    
    columns={columns} 
    dataSource={doctorList}
    bordered
    />
    {/* 有什么方法能把他们封装一下吗？ 或者用循环也行 */}
    <Modal
      visible={isAuthVisible}
      title='权限设置'
      footer={null}
      onCancel={()=>{
        setAuthVisible(false)
      }}
    >
      <AuthPanel rowData={seletedItem} />
    </Modal>
    <Modal
      visible={isRoleVisible}
      title='病人分配'
      footer={null}
      onCancel={()=>{
        setRoleVisible(false)
      }}
    >
      <RolePanel rowData={seletedItem} />
    </Modal>
    <Modal
        visible={isAddVisible}
        title='医师添加'
        footer={null}
        onCancel={()=>{
          setAddVisible(false)
        }}
    >
      <DocAddPanel/>
    </Modal>
  </div> ;  
};

export default Doctor;
