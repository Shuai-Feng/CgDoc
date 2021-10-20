import * as React from 'react';
import './style.less';

interface IDemoProps {}

const Demo: React.FunctionComponent<IDemoProps> = (props) => {
  return (
    <div className={'demoPage'}>
      <div className="content">
        <div className="card">
          <span></span>
          <div className="innerContent">👴</div>
        </div>
        <div className="card">
          <span></span>
          <div className="innerContent">👴</div>
        </div>
        <div className="card">
          <span></span>
          <div className="innerContent">👴</div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
