import * as React from 'react';

export interface IHomeProps {
}

export interface IHomeState {
}

export default class Home extends React.Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    return (
      <div>
          欢迎指挥官
      </div>
    );
  }
}
