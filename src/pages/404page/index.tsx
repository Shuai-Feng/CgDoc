import * as React from 'react';
import { Result,Button } from 'antd';
interface IPage404Props {
}

const Page404: React.FunctionComponent<IPage404Props> = (props:any) => {
  const handleHome = ()=>{
    props.history.push('/home');
  }
  return <div className='container'>
       <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary" onClick={handleHome}>Back Home</Button>}
      />
  </div>;
};

export default Page404;
