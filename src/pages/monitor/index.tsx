import React,{useEffect,useState} from 'react';
import { Card,Avatar,List,Tooltip,Drawer} from 'antd';
import { SettingOutlined,EditOutlined,EllipsisOutlined} from '@ant-design/icons';
import Moment from 'moment';

import Axios from '@/utils/axios';

const CardMeta = Card.Meta;

const ListItem = List.Item;

interface IMonitorProps {
  
}

const Monitor: React.FunctionComponent<IMonitorProps> = (props) => {
  //数据定义
  const [patientList,setPatient] = useState([]); //患者列表信息
  const [scWidth,setscWidth] = useState(document.documentElement.clientWidth);//当前屏幕宽度
  const [dwVisible,setdwVisible] = useState(false);//抽屉控件是否显示
  const [dwTitle,setdwTitle] = useState('');//抽屉标题名

  const dwContext = {
    "setting":'病床设置',
    "edit":'病例编辑 '+ (Moment(new Date()).format('YYYY-MM-DD')),
    "ellipsis":'病患详情'
  }
  let resize = ()=>{
    setscWidth(document.documentElement.clientWidth)
  }
  //请求病人列表
  let requestList = async ()=>{
      let listresult:any = await Axios.ajax({url:"/patient/list",data:{
        params:{}
      }})
      setPatient(listresult.result)
  }
  let handleDrawerOpen = (type:string)=>{
    setdwVisible(true);
    setdwTitle(type)
  }
  //绑定事件监听

  useEffect(()=>{
    window.addEventListener('resize',resize)
    requestList();
  },[])

  
  //解绑时间监听  
  useEffect(()=>{
    return ()=>{
      window.removeEventListener('resize',resize)
    }
  },[])

  return <div>
          <Card style={{marginBottom:10}}>病人监控</Card>
          <List 
            style={{margin:'12  px 10px'}}
            dataSource={patientList}
            grid={scWidth>800?{ gutter: 16, column: 3 }:{ gutter: 16, column: 1 }}
            
            renderItem={(item:any) => (        
                  <ListItem>
                    <Card
                      actions={[
                        <Tooltip title="病床设置" arrowPointAtCenter>
                            <SettingOutlined key="setting"  onClick={()=>handleDrawerOpen('setting')}/>
                        </Tooltip>
                        ,
                        <Tooltip title="病例编辑" arrowPointAtCenter>
                            <EditOutlined key="edit"  onClick={()=>handleDrawerOpen('edit')}/>
                        </Tooltip>
                        ,
                        <Tooltip title="病患详情" arrowPointAtCenter>
                            <EllipsisOutlined key="ellipsis"  onClick={()=>handleDrawerOpen('ellipsis')}/>
                        </Tooltip>
                      ]}
                    >
                      <CardMeta
                        avatar={<Avatar style={{ backgroundColor: '#0C6AFF' }}>{item.patient_name.substr(0,1)}</Avatar>}
                        title={<a>{`${item.bed_num}号床 ${item.patient_name} ${item.patient_age}岁`}</a>}
                        description={item.patient_detial}
                      />
                    </Card>
                  </ListItem>   
            )}
            >
            </List> 
           <Drawer
            visible={dwVisible}
            width={scWidth>700?600:'80vw'}
            title={dwContext[dwTitle]}
            onClose={()=>{
              setdwVisible(false);
            }}
           >
              {/* 通过dwTtitle 判断渲染那个 功能组件 */}
              {dwTitle == 'setting'?'setting':''}
              {dwTitle == 'edit'?'edit':''}
              {dwTitle == 'ellipsis'?'ellipsis':''}
           </Drawer>
  </div>;
};

export default Monitor;
