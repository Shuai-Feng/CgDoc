import React from 'react';
import {
    HomeOutlined,
    AccountBookOutlined,
    ExperimentOutlined,
    UserOutlined,
    PayCircleOutlined,
    UserAddOutlined,
    UserDeleteOutlined
} from '@ant-design/icons';

const menuList:any = [
    {
        title:"首页",
        icon:<HomeOutlined />,
        key:"/home"
       
    },
    {
        title:'数据监控',
        icon:<AccountBookOutlined />,
        key:'/monitor',
    },
    {
        title:'药品管理',
        icon:<ExperimentOutlined />,
        key:'/medic'
    },
    {
        title:'病人管理',
        icon:<UserOutlined />,
        key:'/user',
        children:[
            {
                title:'病人管理',
                icon:<UserDeleteOutlined/>,
                key:'/user/userState',
            },
            {
                title:'病人入院',
                icon:<UserAddOutlined/>,
                key:'/user/userAdd',
            },
        ]
    },
    {
        title:'订单查询',
        icon:<PayCircleOutlined />,
        key:'/order'
    }
]

export default menuList