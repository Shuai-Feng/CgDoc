import * as React from 'react';
import { Spin } from 'antd';
import './style.scss'
interface ILoadingProps {
}

const Loading: React.FunctionComponent<ILoadingProps> = (props) => {
  return <div className='dyloading'>
      <Spin/> 加载中，请稍后~
  </div> ;
};

export default Loading;
