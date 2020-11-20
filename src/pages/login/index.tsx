import React, { useEffect } from 'react';
import './style.less';
import { Form, Button, Input, Row, Col } from 'antd';
// @ts-ignore
import Particles from 'particlesjs';
const FormItem = Form.Item;

interface ILoginProps {}

const Login: React.FunctionComponent<ILoginProps> = props => {
  const formLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };
  useEffect(() => {
    Particles.init({
      selector: '.bg_line',
      connectParticles: false,
      color: ['#ffffff', '#0099ff'],
      speed: 0.2,
      sizeVariations: 3,
    });
  }, []);
  return (
    <div className="LoginPage">
      <canvas className="bg_line"></canvas>
      <div className="wrapper">
        <h1 className="login_title">Cg Doc 后台登陆</h1>
        <Form className="loginForm">
          <FormItem label="用户名" {...formLayout}>
            <Input placeholder={'请输入用户名'} />
          </FormItem>
          <FormItem label="密码" {...formLayout}>
            <Input type="password" />
          </FormItem>
          <FormItem label="验证码" {...formLayout}>
            <Row gutter={[10, 10]}>
              <Col span={14}>
                <Input type="input" />
              </Col>
              <Col span={10} style={{ overflow: 'hidden' }}>
                <img
                  style={{ width: '100%', height: 30 }}
                  src="http://shuaifeng.xyz/CgDoc/api/yzm.php"
                  alt=""
                />
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Button type="primary">登陆</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

export default Login;
