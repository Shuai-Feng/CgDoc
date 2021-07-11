import * as React from 'react';

interface IICUpageProps {}

const ICUpage: React.FunctionComponent<IICUpageProps> = props => {
  return (
    <div className="div">
      👴的ICUpage界面
      {props.children}
    </div>
  );
};

export default ICUpage;
