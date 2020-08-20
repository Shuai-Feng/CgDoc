import React from 'react';
import { Form,Card,Input,Select,DatePicker,Row,Col,Button,message} from 'antd';
import Axios from '@/utils/axios';

const Option = Select.Option;
const FormItem = Form.Item;
const TextArea = Input.TextArea;

interface IUserAddProps {
}

const UserAdd: React.FunctionComponent<IUserAddProps> = (props) => {
  const [ myForm ] = Form.useForm();
  //表单样式布局
  const formlayout = {
    wrapperCol:{
      sm:24,
      md:12
    },
    labelCol:{
      sm:24,
      md:6
    },
  }
  //初始化表单ID
  myForm.setFieldsValue({'patient_id':+new Date()})

  let handleSubmit = ()=>{
      myForm.validateFields()
      .then(formdate=>{
        Axios.ajax({url:'/patient/add',data:{params:{ ...formdate }}})
        .then(()=>{
          message.success('病人添加成功')
          location.reload()
        })
      })
      .catch((error)=>{
        message.warn('表单有点问题')
      })
  }
  return <div>
    <Card title={'入院登记'}>
        <Form form={myForm} >
          <FormItem 
            {...formlayout}
            key={'patient_id'}
            label ={'病人ID'}
            name={'patient_id'}
         
          >
            <Input disabled  />
          </FormItem>
          <FormItem 
            {...formlayout}
            key={'patient_name'}
            label={'病人名称'}
            name={'patient_name'}
            rules={[{ required: true, message: '请输入患者名称 !' }]}
          >
            <Input/>
          </FormItem>
          <FormItem 
            {...formlayout}
            key={'patient_phone'}
            label={'病人联系方式'}
            name={'patient_phone'}
            rules={[{ required: true, message: '请输入患者联系方式' },
            { pattern:/^1[345678]\d{9}$/,message:"请输入正式的手机号" }]}
          >
            <Input/>
          </FormItem>
    
          <Row>
            <Col
              style={document.documentElement.clientWidth>700?{marginLeft:215}:{}}
            >
              <FormItem 
                key={'patient_date'}
                name={'patient_date'}
                label={'入院时间'}
                rules={[{ required: true, message: '请选择入院时间 !' }]}
              >
                <DatePicker style={{width:200}} />
              </FormItem>
            </Col>
            <Col
              offset={document.documentElement.clientWidth>700?2:0}
              // style={document.documentElement.clientWidth>700?{marginLeft:40}:{}}
            >
              <FormItem 
                {...formlayout}
                key={'patient_bed'}
                name={'patient_bed'}
                label={'床位选择:'}
                rules={[{required:true,message:"必须选择床位"}]}
              >
                <Select style={document.documentElement.clientWidth>700?{marginLeft:24,width:200}:{}} placeholder={'请选择患者床位'}  >
                  <Option value='ben_1'>1号床</Option>
                  <Option value='ben_2'>2号床</Option>
                  <Option value='ben_3'>3号床</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <FormItem
             key={'patient_detial'}
             name={'patient_detial'}
             label={'病例信息'}
             {...formlayout}
          >
            <TextArea style={{height:150}}/>
          </FormItem>
          <FormItem
           {...{
             wrapperCol:{
               md:{
                 offset:22
               }
             }
           }}
          >
            <Button onClick={handleSubmit} type='primary'>信息录入</Button>
          </FormItem>
        
        </Form>
    </Card>
  </div> ;
};

export default UserAdd;
