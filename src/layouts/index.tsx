import * as React from 'react';
import { IRouteComponentProps } from 'umi';
import { Layout, ConfigProvider } from 'antd';

import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/locale/zh_CN';

//样式初始化
import '@/styles/reset.css';
import '@/styles/loading.less';
import '@/styles/default.less';

import NavLeft from '@/component/NavLeft';
import NavHeader from '@/component/Header';
import MobHeader from '@/component/MobHeader';

const { Content, Footer, Sider } = Layout;

const glLayout = (props: IRouteComponentProps) => {
  //详情页面的使用
  if (props.location.pathname === '/detail') {
    return (
      <div>
        detial
        {props.children}
      </div>
    );
  }

  if (['/login', '/page404'].includes(props.location.pathname)) {
    return <div>{props.children}</div>;
  }
  //通过这个可以让移动端兼容性更好
  return (
    <Layout style={{ width: '100vw', overflow: 'hidden' }}>
      <Sider breakpoint="lg" collapsedWidth={0} width={220}>
        {/* 这里放menu组件 */}
        <NavLeft className="navLeft" />
      </Sider>
      <Layout
        className="main"
        style={
          document.documentElement.clientWidth < 500
            ? { minWidth: '100vw' }
            : {}
        }
      >
        <Content>
          <NavHeader />
          <div style={{ margin: '24px 16px 0' }}>
            <ConfigProvider locale={locale}>{props.children}</ConfigProvider>
          </div>
          <Footer style={{ textAlign: 'center' }}>
            CgDoc医疗管理系统 &copy; Crerated by Shuaifeng
          </Footer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default glLayout;
