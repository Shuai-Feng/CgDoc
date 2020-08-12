import * as React from 'react';
import { Card,Avatar } from 'antd';
const Grid = Card.Grid;

interface IMonitorProps {
  
}

const Monitor: React.FunctionComponent<IMonitorProps> = (props) => {
  return <div>
      <Card>
        <Grid>
           <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        </Grid>
        <Grid>
           <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        </Grid>
        <Grid>
           <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        </Grid>
        <Grid>
           <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        </Grid>
      </Card>
  </div>;
};

export default Monitor;
