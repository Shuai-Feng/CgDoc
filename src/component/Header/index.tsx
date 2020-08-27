import * as React from 'react';
import { NavLink,connect,withRouter} from 'umi';
import { Avatar,Row,Col} from 'antd';
import menuData from '@/component/NavLeft/menuConfig';
import './style.less';

export interface IHeaderProps {
  dispatch:Function,
  menuName:string,
  location:any
}

export interface IHeaderState {
  menuName?:string
  userName?:string
}

 class Header extends React.Component<IHeaderProps, IHeaderState> {

  state = {
    userName:'admin'
  }
  
  //设置当前的面包屑的标题
  menuNameSet = ()=>{
    let bianli = (data:Array<any>)=>{
      const { dispatch } = this.props;
      //通过遍历menuData进行更改
      data.forEach(item=>{
        if(item.children){
          bianli(item.children)
        }else{
          if(item.key === this.props.location.pathname){
             dispatch({type:'Menu/Switch',menuName:item.title});
          }
        }
      })
    }
    bianli(menuData)
  }

  //每次改变页面的时候都会刷新进行更改
  componentDidMount(){
    this.menuNameSet()
  }
  componentDidUpdate(){
    this.menuNameSet()
  }


  public render() {
    const { userName } = this.state;
    console.log('render',this.state)
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
          <Row>
            <Col span={4} className='breadcrumb-title'>
              {this.props.menuName ||''}
            </Col>
            <Col span={20} ></Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapState = (state:any)=>{
  console.log(state)
  return {
    ...state.Menu
  }
}

//@ts-ignore
export default withRouter(connect(mapState)(Header));
