import * as React from 'react';
import  './style.scss';
interface IOWProps {

}

const OW: React.FunctionComponent<IOWProps> = (props) => {
  return <div className='ow_wrapper'>
        <div className="hex-border">
        <div className="hexagons">
            <div className="hexagon"></div>
            <div className="hexagon"></div>
            <div className="hexagon"></div>
            <div className="hexagon"></div>
            <div className="hexagon"></div>
            <div className="hexagon"></div>
            <div className="hexagon"></div>
        </div>
        </div>
  </div> ;
};

export default OW;
