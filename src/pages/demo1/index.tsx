import * as React from 'react';
import Carousel from './components/Carousel';

interface ICarouslProps {}

const Carousl: React.FunctionComponent<ICarouslProps> = props => {
  return (
    <div className="demo1">
      <Carousel
        imgUrl={['./images/1.jpg', './images/2.jpg', './images/3.jpg']}
      />
    </div>
  );
};

export default Carousl;
