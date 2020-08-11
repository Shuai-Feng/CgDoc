import * as React from 'react';
import { Card,Button } from 'antd';
  
export interface IOrderState {

}

export default class Order extends React.Component<{}, IOrderState> {
  public render() {
    return (
      <div>
        <Card>
          <Button type='primary'>订单查询</Button>
        </Card>
      </div>
    );
  }
}
