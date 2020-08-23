import React,{useEffect,useState} from 'react';
import { Row,Col,Switch,Button,Modal } from 'antd';
import Utils from '@/utils/util';
interface ISetPanelProps {
  panelSetting:Array<any>,
  value:Array<any>,
  onSetChange:Function
}

const SetPanel: React.FunctionComponent<ISetPanelProps> = (props) => {
  const { panelSetting,value,onSetChange } = props
  const [isBtn,setBtn] = useState(true)

  //switch更爱
  let everChange = (seting_id:string)=>{
    setBtn(false)
    if(value.includes(seting_id)){ 
      value.splice(value.indexOf(seting_id),1);
    }else{
      value.push(seting_id)
    }
    onSetChange(value.slice())
  }
  let handleSubmit = ()=>{
    Utils.ee_emmit('settingRequest',value)
    setBtn(true)
  }
  return <div>
    <Row gutter={[12,12]}>
        {
          panelSetting.map(item=>{
            return <Col xs={12} md={8} key={item.key}>
              <label>
                {item.name+':'}
                <Switch style={{marginLeft:10}} 
                checked={value.includes(item.id)} 
                onChange={()=>{everChange(item.id)}}
                />
              </label>
            </Col>
          })
        }
    </Row> 
    <Row>
      <Button disabled={isBtn} onClick={()=>{
        Modal.confirm({
          title:"是否确认更改",
          onOk:()=>{
            handleSubmit()
          }
        })
      }}>提交更改</Button>
    </Row>
  </div> ;
};

export default SetPanel;
