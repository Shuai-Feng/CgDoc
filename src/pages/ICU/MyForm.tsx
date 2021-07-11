import * as React from 'react';
import { RouterProps } from 'react-router';
import { Form, Button, Input, Select } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Item: FormItem, List: FormList } = Form;

interface IMyFormProps extends RouterProps {}

const MyForm: React.FunctionComponent<IMyFormProps> = props => {
  const [form] = Form.useForm();
  const [value, setValue] = useState<string[]>([]);

  // const sl = ()=>(
  //   <Select
  //    onChange={(value)=>{
  //     setValue(value)
  //   }}
  //     mode='multiple'
  //   >
  //     <Option>Top1</Option>
  //     <Option>Top2</Option>
  //     <Option>Top3</Option>
  //   </Select>
  // )

  return (
    <div>
      {/* {Object.keys(props.match.params).length ? props.match.params.id : '新建'} */}
      <Form form={form}>
        <Form.List name="sights">
          {(fields, { add, remove }) => {
            debugger;
            return (
              <>
                {fields.map(field => (
                  // 1。 绑定key 不然删不掉

                  <div key={field.key}>
                    {/* <FormItem>
                      {field.name+1}
                    </FormItem> */}
                    <FormItem
                      {...field}
                      label={`${field.name}大事记`}
                      name={[field.name, 'people']}
                      fieldKey={[field.fieldKey, 'people']}
                      rules={[{ required: true, message: 'Missing price' }]}
                    >
                      <Input.TextArea></Input.TextArea>
                    </FormItem>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </div>
                ))}

                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block>
                    Add sights
                  </Button>
                </Form.Item>
              </>
            );
          }}
        </Form.List>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default MyForm;
