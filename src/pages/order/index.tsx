import * as React from 'react';
import { Card,Button,Table,Drawer,Badge,Tag,message,Modal,Descriptions} from 'antd';
import EditForm from './component/EditForm';
import Axios from '@/utils/axios';  
const DescrItem = Descriptions.Item;
//用于展示表格数据的接口
interface medicItem {
  medic_id:string
  medic_status:number
  medic_name:string
  medic_dept:string
  medic_num:number
  create_time:Date
  user_name:string
}

export interface IOrderState {
    //表格数据
    dataSource:any,
    //判断是否打开侧边抽屉
    isDrawerVisbel:boolean,
    //用于存放未完成订单数量
    orderNum:number
    //操作类型
    operaType:string
    //表格行得id
    selectedRowKeys:Array<number>
    //选择改行得内容
    selectedRowItem:Array<medicItem>
}

export default class Order extends React.Component<{}, IOrderState> {
  state = {
    dataSource:undefined,
    isDrawerVisbel:false,
    selectedRowKeys:[],
    selectedRowItem:[],
    orderNum:0,
    operaType:''
  }
  //负责请求数据
  requestList = async ()=>{
    // 使用 async 和 await 进行订单设置
    let dataSource:any = await Axios.ajax({url:"/order/list",data:{}})
    let orderNum:number = 0;
     dataSource = dataSource.result.item_list.map((item:any,index:number)=>{
        item.key = index
        if(!item.medic_status){
          orderNum++
        }
        return item
    })
    this.setState({
      dataSource,
      orderNum
    })
  }

  //负责删除数据
  handleOrderDelete = (itemKey:string)=>{
    Axios.ajax({url:'/order/delete',data:{
      param:{
        itemKey
      }
    }}).then(res=>{
      message.success('订单删除成功');
      //当然，删完得刷新一下
      this.requestList();
    })
  }
  handleOperation = (type:string)=>{
    if(!this.state.selectedRowKeys.length){
      Modal.info({title:"请选择一条记录"})
      return 
    }
    let rowData:medicItem = this.state.selectedRowItem[0]||{};

    if(['edit','view'].includes(type)){
      this.setState({
        isDrawerVisbel:true,
        operaType:type
      })
    }else{
      Modal.confirm({
        title:`您确定删除订单 ${rowData.medic_id} 吗？`,
        onOk:()=>{
          this.handleOrderDelete(rowData.medic_id)
        },
        onCancel() {
          console.log('Cancel');
        },
      })
    }
  }
  handleOperaType = (type:string):any=>{
    return {
      'view':'订单详情',
      'edit':'订单修改',
      'delete':'订单删除'
    }[type]
  }
  //这部分是表格选择得函数
  handleSelect = (selectedRowKeys:any,selectedRowItem:any)=>{
    this.setState({
      selectedRowKeys,
      selectedRowItem
    })
  }
  componentDidMount(){
    this.requestList()
  }
  public render() {
    let { orderNum,selectedRowKeys,selectedRowItem } = this.state;
    let rowData:medicItem = selectedRowItem[0]||{};
    const rowSelection:any = {
      type:'radio',
      selectedRowKeys,
      onChange:this.handleSelect
    }
    const columns = [
      {
        title:"药品id",
        key:'medic_id',
        dataIndex:'medic_id'
      },
      {
        title:"药品名称",
        key:'medic_name',
        dataIndex:'medic_name'
      },
      {
        title:"订单状态",
        key:"medic_status",
        dataIndex:"medic_status",
        render:(value:number)=>{
          if(value){
            return <span><Badge color='green' />{'已完成'}</span>
          }
          return <span><Badge color='red' />{'未完成'}</span>
        }
      },
      {
        title:"药品数量",
        key:'medic_num',
        dataIndex:'medic_num',
        sorter:(rowA:any, rowB:any)=>{
          return rowA.medic_num - rowB.medic_num
        },
      },
      {
        title:"订单创建时间",
        key:'create_time',
        dataIndex:'create_time',
        sorter:(rowA:any, rowB:any)=>{
          return (+new Date(rowA.create_time)) - (+new Date(rowB.create_time))
        },
      },
      {
        title:"创建用户",
        key:'user_name',
        dataIndex:'user_name'
      },
      {
        title:"归属科室",
        key:'medic_dept',
        dataIndex:'medic_dept'
      }
    ]
 
    return (
      <div>
        <Card style={{marginBottom:'10px'}}>
          <Button style={{marginRight:10}} type='primary' onClick={()=>{this.handleOperation('view')}}>订单详情</Button>
          <Button style={{marginRight:10}} type='primary' onClick={()=>{this.handleOperation('edit')}}>订单修改</Button>
          <Button style={{marginRight:10}} type='primary' onClick={()=>{this.handleOperation('delete')}}>删除订单</Button>
          <Button style={{float:"right"}} type='text'>
              {
                orderNum?<span>{orderNum}个订单未完成</span>:<Tag color="green">订单全部完成</Tag>
              }
          </Button>
        </Card>
        <div style={{background:"#fff",padding:"10px"}}>
          <Table 
            columns={columns}
            dataSource={this.state.dataSource}  
            rowSelection={rowSelection}
          />
        </div>
        <Drawer
          width={600}
          title={this.handleOperaType(this.state.operaType)}
          visible={this.state.isDrawerVisbel}
          onClose={()=>{
            this.setState({
              isDrawerVisbel:false
            })
          }}
        >
          {
            this.state.operaType == 'view' ? 
           <Descriptions layout='vertical' bordered title={rowData.medic_name}>
                  <DescrItem label="编号">{rowData.medic_id}</DescrItem>  
                  <DescrItem label="是否完成">{rowData.medic_status?"已完成":"未完成"}</DescrItem>
                  <DescrItem label="药品数量">{rowData.medic_num}</DescrItem>
                  <DescrItem label="配属科室">{rowData.medic_dept}</DescrItem>
                  <DescrItem label="订单创建时间">{rowData.create_time}</DescrItem>
                  <DescrItem label="创建人">{rowData.user_name}</DescrItem>
            </Descriptions>:<EditForm  medicData={rowData} handleClose = {()=>{
              this.setState({
                isDrawerVisbel:false
              })
              this.requestList()
            }} />
          }
        </Drawer>
      </div>
    );
  }
}
