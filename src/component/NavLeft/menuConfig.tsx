import React from 'react';
import {
    HomeOutlined,
    AccountBookOutlined,
    ExperimentOutlined,
    UserOutlined,
    PayCircleOutlined,
    UserAddOutlined,
    UserDeleteOutlined,
    TrademarkOutlined
} from '@ant-design/icons';

const menuList:any = [
    {
        title:"数据报告",
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
                title:'病人离院',
                icon:<UserDeleteOutlined/>,
                key:'/user/userDelete',
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
    },
    {
        title:'医生分配',
        icon:<TrademarkOutlined />,
        key:'/doctor'
    }
]

export default menuList