import * as React from 'react';

import Axios, { AxiosResponse } from 'axios';
import EchartReact from 'echarts-for-react';
import { EChartOption } from 'echarts';

interface IDemo1Props {}

const Demo1: React.FunctionComponent<IDemo1Props> = props => {
  const [echartsOption, setOption] = React.useState<EChartOption>({});

  React.useEffect(() => {
    handleRequest();
  }, []);

  const handleRequest = async () => {
    let res: AxiosResponse = await Axios.get('/api');

    let proData = res.data.data.map((item: any) => {
      return {
        name: item.productName,
        value: item.sales,
      };
    });
    console.log(proData);
    let myOption: EChartOption = {
      title: {
        text: '我的表格',
        left: 10,
        top: 10,
      },
      series: [
        {
          type: 'pie',
          data: proData,
        },
      ],
    };
    setOption(myOption);
  };

  return (
    <div className="Demo1">
      <EchartReact
        showLoading={Object.keys(echartsOption).length == 0}
        option={echartsOption}
        style={{ background: '#fff' }}
      />
    </div>
  );
};

export default Demo1;
