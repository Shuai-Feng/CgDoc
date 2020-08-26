import React,{ useEffect, useState } from 'react';
import { Tree,Form,Input,Button,message,Modal} from 'antd';
import Axios from '@/utils/axios';
import data from '@/component/NavLeft/menuConfig';
import Utils from '@/utils/util';

const FormItem = Form.Item;

interface IAuthPanelProps {
  rowData:any
}




const AuthPanel: React.FunctionComponent<IAuthPanelProps> = (props) => {
  const [checkState,setCheckState]  = useState(props.rowData.menus);
  const [isBtn,setBtn] = useState(true)
  const [ authForm ] = Form.useForm()

  const treeData = [
    {
      title:'平台权限',
      key:'/plantform',
      children:data
    }
  ]
  useEffect(()=>{
    authForm.setFieldsValue({
      'doctor_name':props.rowData.doctor_name,
      'doctor_dept':props.rowData.doctor_dept
    })
  },[])

  //Auth
  let handleAuthSubmit = ()=>{
    Axios.ajax({url:'/doctor/authEdit',data:{
      params:{
        ...authForm.getFieldsValue(),
        doctor_id:props.rowData.doctor_id,
        menu:checkState
      }
    }}).then(res=>{
      message.success('医生状态更改成功')
      Utils.ee_emmit('handle_close_auth')
    })
    
  }


  return <div>
    <Form
      form={authForm}
    >
        <FormItem
          label={'医师姓名'}
          name={'doctor_name'}
        >
          <Input disabled />
        </FormItem> 
        <FormItem
          label={'所属部门'}
          name={'doctor_dept'}
        >
          <Input disabled />
        </FormItem> 
        <FormItem
          name={'menu'}
        >
          <Tree
              checkable
              defaultExpandAll
              treeData={treeData}
              checkedKeys={checkState}
              onCheck={(checkedKeys)=>{
                setCheckState(checkedKeys)
                setBtn(false)
              }}
            >
          </Tree>
        </FormItem> 
        <FormItem wrapperCol={{
          offset:18
        }}>
        <Button
          type='primary'
          disabled={isBtn}
          onClick={()=>{
            Modal.confirm({
              title:`是否对 ${props.rowData.doctor_name} 进行更改`,
              onOk:handleAuthSubmit
            })
          }}
        >更改提交</Button>
        </FormItem>
    </Form>
  </div> ;
};

export default AuthPanel;
