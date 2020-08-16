import  React,{ useState,useEffect} from 'react';
import { Form,Input,DatePicker,Button,Select,Modal,message} from 'antd';
import Axios from '@/utils/axios';

const Option = Select.Option;
const Item = Form.Item;
interface IEditFormProps {
  medicData:any,
  handleClose:Function
}

const EditForm: React.FC<IEditFormProps> = (props) => {
  let { medicData,handleClose } = props;
  //用于存放表单数据
  //用户存放是否按钮的state
  const [isButton,SetButton] = useState(false);
  //创建form实例
  const [form] = Form.useForm();
  //初始化表单项的所有值
  form.setFieldsValue(medicData)
  //表单项结构处理
  const formLayout = {
    labelCol:{span:5},
    wrapperCol:{span:8}
  }
  const titleinfo  = {
    "medic_id":"药品Id",
    "medic_status":"药品状态",
    "medic_name":"药品名称",
    "medic_dept":"所属部门",
    "medic_num":"订购数量",
    "create_time":"创建事件",
    "user_name":"创建者姓名"
  }
  //用于提交修改数据的函数

  let handleUpdate = ()=>{
    let formValue = form.getFieldsValue();
    Modal.confirm({
      title:'是否对'+formValue.medic_id+'进行更改',
      onOk:()=>{
          Axios.ajax({url:'/order/update',data:{
            params:{
              ...formValue
            }
          }}).then(res=>{
            message.success('订单修改成功')
            handleClose()
          })
      }
    })
  }


  //用于渲染整个表单的函数
  let itemRender = (medicData:any) => {
    let result:Array<any> = [];
    //给select框做特殊处理 不然只显示 0 和 1
    medicData.medic_status =  medicData.medic_status?"已完成":"未完成"
    //循环渲染每一个表单项
    for(let key in medicData){
      if (key == 'medic_status'){
        result.push(<Item {...formLayout} 
          key={key}
          label={titleinfo[key]} 
          name={key}
          >
            <Select
              placeholder={'请选择订单状态'}
            >
              <Option value="0">未完成</Option>
              <Option value="1">已完成</Option>
            </Select>
          </Item>)
      }else if (key == 'key') {
        //什么都不做
      }else if(key == 'medic_num') {
        result.push(
          <Item {...formLayout} 
          key={key}
          label={titleinfo[key]} 
          name={key}
          initialValue={medicData[key]}
          rules={[{ required: true, message: 'Please input your '+ key +'!' }]}
          >
            <Input type='number'/>
          </Item>
        )
      }else {
        result.push(
          <Item {...formLayout} 
          key={key}
          label={titleinfo[key]} 
          name={key}
          rules={[{ required: true, message: 'Please input your '+ key +'!' }]}
          >
            <Input/>
          </Item>
        )
      }
      
    }




    return  <Form 
    form={form}
    onFieldsChange={()=>{
      SetButton(true);
    }}
    >    
      {
        result
      }
      <Item wrapperCol={{offset:20,span:4}} >
          <Button type="primary" htmlType="submit"
            //用于防止用户啥都步改就 提交表单
           disabled={!isButton} 
           onClick={handleUpdate}>确认修改</Button>
      </Item>
    </Form>;
    
  }

  return  <div>
      {itemRender(medicData)}
  </div>;
};

export default EditForm;
