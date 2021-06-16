import * as React from 'react';
import { Button } from 'antd';
import './style.less';

interface INavHeaderProps {
  title: string;
  onBack?: Function;
}

const NavHeader: React.FunctionComponent<INavHeaderProps> = props => {
  return (
    <div className="moblieHeader">
      <section>
        <Button
          type="link"
          style={{ color: '#fff' }}
          onClick={() => {
            if (props.onBack) {
              props.onBack();
            }
          }}
        >
          {' '}
          {'<'}{' '}
        </Button>
      </section>
      <h1>{props.title || ''}</h1>
      <section></section>
    </div>
  );
};

export default NavHeader;
