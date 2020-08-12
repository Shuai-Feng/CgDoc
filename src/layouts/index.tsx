import * as React from 'react';
import { IRouteComponentProps} from 'umi'
import { Layout } from 'antd';

//样式初始化
import '@/styles/reset.css';
import '@/styles/loading.less'
import '@/styles/default.less'

import NavLeft from '@/component/NavLeft';
import NavHeader from '@/component/Header';



const {Content,Footer,Sider}  = Layout;

const glLayout = (props:IRouteComponentProps) => {
  if(props.location.pathname === '/detail'){
    return <div>
      detial
      {props.children}
    </div>
  }
  if(['/login','/page404'].includes(props.location.pathname) ){
    return <div>
      {props.children}
    </div>
  }
  return <Layout>
         <Sider breakpoint="lg" collapsedWidth={0} width={260}>
          {/* 这里放menu组件 */}
          <NavLeft className="navLeft"/>
          </Sider>
          <Layout className="main">
            <Content>
              <NavHeader/>
              <div style={{ margin: '24px 16px 0'}}>
                {props.children}
              </div>
              <Footer style={{textAlign:"center"}}>CgDoc医疗管理系统 &copy; Crerated by Shuaifeng</Footer>
            </Content>
          </Layout>
  </Layout>
};

export default glLayout;
