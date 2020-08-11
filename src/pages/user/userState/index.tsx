import * as React from 'react';

export interface IUserStateProps {
}

export interface IUserStateState {
}

export default class UserState extends React.Component<IUserStateProps, IUserStateState> {
  constructor(props: IUserStateProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    return (
      <div>
        userState
      </div>
    );
  }
}
