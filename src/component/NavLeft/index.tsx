import * as React from 'react';

import menuConfig from './menuConfig';
import { Menu } from 'antd';
import { NavLink } from 'umi';
import { RouterProps } from 'react-router';
import logo from '@/common/logo-ant.svg';

import './style.less';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

interface INavLeftProps {
  className?: string;
}

const NavLeft: React.FunctionComponent<INavLeftProps & RouterProps> = (
  props,
) => {
  let renderMenu = (data: Array<any>) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu
            title={
              <span>
                {/* <NavLink to={item.key}>
                  {item.icon}
                  {item.title}
                </NavLink> */}
                <span style={{ marginRight: 10 }}>{item.icon}</span>
                <span>{item.title}</span>
              </span>
            }
            key={item.key}
          >
            {renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <MenuItem title={item.title} key={item.key}>
          <NavLink to={item.key}>
            <span style={{ marginRight: 10 }}> {item.icon || ''}</span>
            <span> {item.title}</span>
          </NavLink>
        </MenuItem>
      );
    });
  };

  return (
    <div className="navLeft">
      <div className="logo">
        <img src={logo} alt="" />
        CgDoc 监控系统
      </div>
      <Menu theme={'dark'}>{renderMenu(menuConfig)}</Menu>
    </div>
  );
};

export default NavLeft;
