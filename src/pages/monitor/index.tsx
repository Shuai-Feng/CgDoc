import React, { useEffect, useState } from 'react';
import {
  Card,
  Avatar,
  List,
  Tooltip,
  Drawer,
  Descriptions,
  Form,
  Input,
  Divider,
  Button,
  message,
  Switch,
  Col,
  Row,
} from 'antd';
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import SetPanle from './component/SetPanle';

import Moment from 'moment';
import Axios from '@/utils/axios';
import Utils from '@/utils/util';

const CardMeta = Card.Meta;
const DesItem = Descriptions.Item;
const ListItem = List.Item;
const FormItem = Form.Item;
const TextArea = Input.TextArea;

interface IMonitorProps {}

const Monitor: React.FunctionComponent<IMonitorProps> = props => {
  //数据定义
  const [patientList, setPatient] = useState([]); //患者列表信息
  const [current_patient, setCuPatient] = useState({
    patient_id: '',
    patient_name: '',
    bed_num: '',
    medic_dept: '',
    patient_setting: [],
  }); //当前患者设置

  const [scWidth, setscWidth] = useState(document.documentElement.clientWidth); //当前屏幕宽度
  const [dwVisible, setdwVisible] = useState(false); //抽屉控件是否显示
  const [dwTitle, setdwTitle] = useState(''); //抽屉标题名

  const [diaryForm] = Form.useForm();

  const [panelvalue, setpanelValue] = useState([]);

  const panelSetting = [
    {
      id: '1',
      key: 'early_check',
      name: '早间检查',
    },
    {
      id: '2',
      key: 'mid_check',
      name: '午间检查',
    },
    {
      id: '3',
      key: 'night_check',
      name: '晚间检查',
    },
    {
      id: '4',
      key: 'ox_supply',
      name: '氧气供应',
    },
    {
      id: '5',
      key: 'icu',
      name: '病危集中监控',
    },
  ];

  //抽屉标题显示
  const dwContext = {
    setting: '病床设置',
    edit: '病例编辑 ' + Moment(new Date()).format('YYYY-MM-DD'),
    ellipsis: '病患详情',
  };

  //各个字段中文名
  const paContext = {
    patient_id: '患者Id',
    patient_name: '患者姓名',
    patient_age: '患者年龄',
    patient_sex: '患者性别',
    patient_detial: '患者描述',
    patient_setting: '患者检查项设置',
    bed_num: '病床号',
    medic_dept: '所属科室',
    regin_time: '入住时间',
  };

  //患者设置列表
  const patient_setting = {
    early_check: '早间检查',
    mid_check: '午间检查',
    night_check: '晚间检查',
    ox_supply: '氧气供应',
    icu: '病危隔离',
  };

  //界面重定向的
  let resize = () => {
    setscWidth(document.documentElement.clientWidth);
  };

  //请求病人列表
  let requestList = async () => {
    let listresult: any = await Axios.ajax({
      url: '/patient/list',
      data: {
        params: {},
      },
    });
    setPatient(listresult.result);
  };

  let requestPatientSetting = (value: any) => {
    Axios.ajax({
      url: '/patient/settingUpdate',
      data: {
        params: {
          patient_id: current_patient.patient_id,
          patient_setting: value,
        },
      },
    }).then(res => {
      message.success('患者设置更新成功');
    });
  };

  //打开右侧抽屉
  let handleDrawerOpen = (type: string, p_item: any) => {
    //确认当前的病人名
    setCuPatient(p_item);
    panelSetting.forEach(item => {
      if (p_item.patient_setting.includes(item.key)) {
        // @ts-ignore
        panelvalue.push(item.id);
      }
    });
    setpanelValue(panelvalue.slice());
    //打开抽屉
    setdwVisible(true);

    //初始化抽屉标题
    setdwTitle(type);
  };

  //绑定事件监听
  useEffect(() => {
    window.addEventListener('resize', resize);
    requestList();
    //监听事件 当<setting Panel触发提交时的事件>
    Utils.ee_on('settingRequest', (value: any) => {
      console.log('触发提交时间');
      requestPatientSetting(value);
      setdwVisible(false);
    });
  }, []);

  //解绑时间监听
  useEffect(() => {
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div>
      <Card style={{ marginBottom: 10 }}>病人监控</Card>
      <List
        style={{ margin: '12  px 10px' }}
        dataSource={patientList}
        grid={
          scWidth > 800 ? { gutter: 16, column: 3 } : { gutter: 16, column: 1 }
        }
        renderItem={(item: any) => (
          <ListItem>
            <Card
              actions={[
                <Tooltip title="病床设置" arrowPointAtCenter>
                  <SettingOutlined
                    key="setting"
                    onClick={() => handleDrawerOpen('setting', item)}
                  />
                </Tooltip>,
                <Tooltip title="病例编辑" arrowPointAtCenter>
                  <EditOutlined
                    key="edit"
                    onClick={() => handleDrawerOpen('edit', item)}
                  />
                </Tooltip>,
                <Tooltip title="病患详情" arrowPointAtCenter>
                  <EllipsisOutlined
                    key="ellipsis"
                    onClick={() => handleDrawerOpen('ellipsis', item)}
                  />
                </Tooltip>,
              ]}
            >
              <CardMeta
                avatar={
                  <Avatar
                    style={
                      item.patient_sex === 'male'
                        ? { backgroundColor: '#0C6AFF' }
                        : { backgroundColor: 'hotpink' }
                    }
                  >
                    {item.patient_name.substr(0, 1)}
                  </Avatar>
                }
                title={
                  <a>
                    {`${item.bed_num}号床 ${item.patient_name}
                          ${item.patient_sex === 'male' ? '男' : '女'} 
                          ${item.patient_age}岁`}
                  </a>
                }
                description={item.patient_detial}
              />
            </Card>
          </ListItem>
        )}
      ></List>
      <Drawer
        visible={dwVisible}
        width={scWidth > 700 ? 600 : '85vw'}
        title={dwContext[dwTitle]}
        onClose={() => {
          //关闭抽屉
          setdwVisible(false);
          //同时清空panelValue
          setpanelValue([]);
        }}
      >
        {/* 通过dwTtitle 判断渲染那个 功能组件 */}

        {dwTitle == 'setting' ? (
          <div>
            <p>患者ID: {current_patient.patient_id}</p>
            <p>患者姓名: {current_patient.patient_name}</p>
            <p>患者所属床位: {current_patient.bed_num}号床</p>
            <Divider />
            <SetPanle
              value={panelvalue}
              panelSetting={panelSetting}
              onSetChange={(value: any) => {
                setpanelValue(value);
              }}
            />
          </div>
        ) : (
          ''
        )}

        {/* 病例编辑 */}
        {dwTitle == 'edit' ? (
          <Form
            form={diaryForm}
            onFinish={values => {
              Axios.ajax({
                url: '/patient/diary',
                data: {
                  params: {
                    ...values,
                    patient_id: current_patient.patient_id,
                  },
                },
              }).then(res => {
                message.success('病人日志已更新');
                setdwVisible(false);
                diaryForm.resetFields();
                requestList();
              });
            }}
          >
            <p>患者ID: {current_patient.patient_id}</p>
            <p>患者姓名: {current_patient.patient_name}</p>
            <p>患者所属床位: {current_patient.bed_num}号床</p>
            <Divider />
            <FormItem
              label={'患者病例：'}
              key={'patient_diary'}
              name={'patient_diary'}
              rules={[{ required: true, message: '病例信息不可为空' }]}
            >
              <TextArea placeholder="请输入今日病例" style={{ height: 150 }} />
            </FormItem>
            <FormItem wrapperCol={{ offset: 20 }}>
              <Button type="primary" htmlType="submit">
                {' '}
                提交{' '}
              </Button>
            </FormItem>
          </Form>
        ) : (
          ''
        )}

        {/*用户信息查看 */}
        {dwTitle == 'ellipsis' ? (
          <Descriptions bordered layout="vertical">
            {Object.keys(current_patient).map((item: any) => {
              return (
                <DesItem label={paContext[item]} key={item}>
                  {item === 'patient_setting'
                    ? current_patient.patient_setting.map(item => {
                        return <p>{patient_setting[item]}</p>;
                      })
                    : current_patient[item]}
                  {}
                </DesItem>
              );
            })}
          </Descriptions>
        ) : (
          ''
        )}
      </Drawer>
    </div>
  );
};

export default Monitor;
