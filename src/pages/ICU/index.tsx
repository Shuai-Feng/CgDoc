import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import './style.less';

interface IICUpageProps {}

const ICUpage: React.FunctionComponent<IICUpageProps> = props => {
  const colLayout = {
    md: 7,
    xs: 24,
  };
  const colLayout_lg = {
    md: 10,
    xs: 24,
  };
  return (
    <div className="ICU_page">
      {/* 这是Icupage 的渲染界面 此界面采用三列布局 */}
      <Row>
        <Col {...colLayout}>
          <div className="box">123</div>
        </Col>
        <Col {...colLayout}>
          <div className="box">123</div>
        </Col>
        <Col {...colLayout_lg}>
          <div className="box">123</div>
        </Col>
      </Row>
    </div>
  );
};

export default ICUpage;
