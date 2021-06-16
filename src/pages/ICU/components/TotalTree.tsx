import * as React from 'react';
import './style.less';

interface ITotalTreeProps {}

const TotalTree: React.FunctionComponent<ITotalTreeProps> = props => {
  return (
    <div className="total">
      <div className="box">✌产品树：50</div>
      <div className="line"></div>
      <div className="box">✌战场：50</div>
      <div className="line"></div>
      <div className="circle"></div>
      <div className="box">
        <div className="top">子产品：12</div>
        <div className="bottom">总产品：12</div>
      </div>
    </div>
  );
};

export default TotalTree;
