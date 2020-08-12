import * as React from 'react';
import { NavLink } from 'umi';
import { Avatar } from 'antd';
import './style.less';

export interface IHeaderProps {
}

export interface IHeaderState {
  userName?:string
}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  state = {
    userName:'admin'
  }

  public render() {
    const { userName } = this.state;
    return (
      <div className='header'>
        <div className="header-top">
          <Avatar src='https://www.yunboys.cn/sjtx/api.php' ></Avatar>
          <span className='userbar'>
            欢迎您 {userName}
          </span>
          <NavLink to='/login'>退出</NavLink>
        </div>
        <div className="header-bottom">

        </div>
      </div>
    );
  }
}
