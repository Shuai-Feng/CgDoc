import * as React from 'react';
import './style.less'
import { Form,Button,Card,Input} from 'antd';

const FormItem = Form.Item;

interface ILoginProps {

}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
    console.log(props)
    const formLayout = {
        labelCol:{span:24},
        wrapperCol:{span:24}
    }
  return <div className='wrapper'>
        <h1 className='login_title'>Cg Doc 后台登陆</h1>
        <Form className='loginForm'>
                <FormItem label='用户名' {...formLayout} >
                    <Input placeholder={'请输入用户名'}/>
                </FormItem>
                <FormItem label='密码' {...formLayout} >
                    <Input type='password'/>
                </FormItem>
                <FormItem >
                    <Button type='primary'>登陆</Button>
                </FormItem>
        </Form>
  </div> ;
};

export default Login;
