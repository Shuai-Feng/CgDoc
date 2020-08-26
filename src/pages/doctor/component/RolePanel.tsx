import  React, { useState,useEffect } from 'react';
import { Transfer,message,Button,Form,Input,Modal} from 'antd';
import Utils from '@/utils/util';
const FormItem = Form.Item;

import Axios from '@/utils/axios';


//这是TransferItem的接口
import { TransferItem} from 'antd/es/transfer';


interface IRolePanelProps {
    rowData:any
}



const RolePanel: React.FunctionComponent<IRolePanelProps> = (props) => {
  //源数据
  let initUserList:Array<TransferItem> =[]; 
  let initTargetKey:Array<string> =[]; 
  let initUselectKey:Array<string> =[]; 

  const [isBtn,setBtn] = useState(true)

  const [userList,setUserList] = useState(initUserList)
  //目标数据 右侧transfer
  const [targetKey,setTargetKey] = useState(initTargetKey);
  //目标数据 左侧transfer
  const [selectKey,setSelect] = useState(initUselectKey);
  //所选择表格数据
  const { rowData } = props;

  //宁的表单
  const [ myRole ] = Form.useForm();
  
  const formLayout = {
    labelCol:{
      span:4
    },
    wrapperCol:{
      
      span:20
    }
  }

  let handleRequest = async ()=>{

    try {
    
      let list:any = await Axios.ajax({url:"/doctor/user_list",data:{
        params:{
          doctor_id:rowData.doctor_id
        }
      }})
      //通过遍历来初始话Trnasfer列表
      list.result.forEach((item:any)=> {
        // debugger
        let dataItem:TransferItem= {
          key:item.user_id,
          title:item.user_name,
          description:item.user_name
        }
        if(item.status){
          if(!(item.user_id % 3)){
            selectKey.push(item.user_id)
          }
        }else{
          targetKey.push(item.user_id)
        }
        userList.push(dataItem);
      });

      setUserList(userList.slice())
      setSelect(selectKey.slice())
      setTargetKey(targetKey.slice())

    } catch (error) {
      message.warning('出现了问题')
    }
  }

  let handleRoleSubmit = ()=>{
    let formData:any = myRole.getFieldsValue();
    Axios.ajax({url:'/doctor/authEdit',data:{
      params:{
        ...formData,
        targetKey
      }
    }}).then(res=>{
      message.success('患者分配信息更改完成')
      Utils.ee_emmit('handle_close_role')
    })
  }
  //每次切换选择条目时发送请求
  useEffect(()=>{
    handleRequest();
    console.log(rowData)
    myRole.setFieldsValue({...rowData})
  },[props.rowData])

  return <div>
    <Form
      form={myRole}
    >
      <FormItem
        label={'医师ID'}
        name={'doctor_id'}
        labelAlign='left'
        {...formLayout}
      >
        <Input disabled />
      </FormItem>
      <FormItem
        label={'医师姓名'}
        name={'doctor_name'}
        labelAlign='left'
        {...formLayout}
      >
        <Input disabled />
      </FormItem>
      <FormItem wrapperCol={{
        md:{
          offset:2
        }
      }}>
        <Transfer
          dataSource={userList}
          selectedKeys={selectKey}
          targetKeys={targetKey}
          //@ts-ignore
          render={(item)=>{
            return item.title
          }}
          onChange={(targetKey)=>{
            setTargetKey(targetKey)
            setBtn(false)
          }}
          onSelectChange={(sourcekey,targetKey)=>{
            setSelect([...sourcekey,...targetKey])
          }}
        />
      </FormItem>
      <FormItem
        wrapperCol={{offset:18}}
      >
        <Button disabled={isBtn}
         onClick={()=>{
           Modal.confirm({
             title:`是否对 ${rowData.doctor_name} 进行更改`,
             onOk:handleRoleSubmit
           })
         }}
        >提交更改</Button>
      </FormItem>
    </Form>
  </div> ;
};

export default RolePanel;
