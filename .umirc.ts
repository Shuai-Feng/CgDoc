import { defineConfig, Redirect } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  publicPath:'./',
  history:{
    type:'hash'
  },
  sass: {
  
  },
  dynamicImport:{
    loading:'@/component/OWLoading'
  },
  alias:{
    'public':'@/../public/',
  },
  routes:[
    {
      exact:false,path:'/',component:'@/layouts/index.tsx',
      routes:[
        //登陆界面
        { exact: true, path: '/login', component: '@/pages/login' },
        //
        { exact: true, path: '/', redirect:'/home' },
        { exact: true, path: '/home', component: '@/pages/home' },
        //员工管理的路由
        {     
          path: '/user',
          //防止单独进入此页面
          routes:[
            { exact: true, path: '/user/userState', component: '@/pages/user/userState' },
            { exact: true, path: '/user/userAdd', component: '@/pages/user/userAdd' },
          ]
        },
        //药品管理路由
        { exact: true, path: '/medic', component: '@/pages/medic' },
        //数据监控
        { exact: true, path: '/monitor', component: '@/pages/monitor' },
        //订单管理
        { exact: true, path: '/order', component: '@/pages/order' },
        //由于显示子页面的子路由
        { exact: true, path: '/detail', component: '@/pages/detail'},
        
        { component: '@/pages/404page' },
      
      ]
    }
  ]
});
