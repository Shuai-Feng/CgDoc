import React from 'react';
import { Form,Input,Select,Button,message} from 'antd';
import Axios from '@/utils/axios';
import Utils from '@/utils/util';
const FormItem = Form.Item;
const Option = Select.Option

interface IDcAddPanelProps {

}

const DcAddPanel: React.FunctionComponent<IDcAddPanelProps> = (props) => { 
  const [ addForm ] = Form.useForm();
  const formLayout = {
    labelCol:{
      md:6
    },
    wrapperCol:{
      md:18
    }
  }
  addForm.setFieldsValue({doctor_id:+ new Date()})
  return <div>
    
      <Form
        form={addForm}
        onFinish={()=>{
          Axios.ajax({url:'/patient/add',data:{
            params:{
              ...addForm.getFieldsValue()
            }
          }}).then(res=>{
            message.success('医生已经成功添加')
            Utils.ee_emmit('handle_close_add')
          })
        }}
      >
          <FormItem
            label={'医师ID'}
            name={'doctor_id'}
            {...formLayout}
          >
              <Input disabled/>
          </FormItem>
          <FormItem
            label={'医师姓名'}
            name={'doctor_name'}
            {...formLayout}
            rules={[{required:true,message:"请输入医师姓名"}]}
          >
              <Input/>
          </FormItem>
          <FormItem
            label={'医师所属部门'}
            name={'doctor_dept'}
            {...formLayout}
            rules={[{required:true,message:"请选择所属部门"}]}
          >
              <Select
                placeholder="请选择所对应科室"
              >
                  <Option value='brain_dept'>脑科</Option>
                  <Option value='women_dept'>妇科</Option>
                  <Option value='mentail_dept'>精神科</Option>
              </Select>
          </FormItem>
          <FormItem wrapperCol={{offset:19}}>
            <Button htmlType='submit' type='primary'>
              确定添加
            </Button>
          </FormItem>
      </Form>
  </div> ;
};

export default DcAddPanel;
