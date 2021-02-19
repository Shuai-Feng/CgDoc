import * as React from 'react';
import './style.less';
import classnames from 'classnames';
//@ts-ignore

interface ICarouselProps {
  imgUrl: string[];
}

const Carousel: React.FunctionComponent<ICarouselProps> = props => {
  let { imgUrl } = props;

  // const [slider,setSlide]  = React.useState(0);

  function useSlider(img_len: number) {
    const [slider, setSlider] = React.useState<number>(0);

    //滑倒头返回
    React.useEffect(() => {
      if (slider == img_len) {
        setSlider(0);
      }
      if (slider == -1) {
        setSlider(img_len - 1);
      }
    }, [slider]);

    return { slider, setSlider };
  }

  const { slider, setSlider } = useSlider(imgUrl.length);

  return (
    <div className="Carousel">
      <div
        className={classnames({
          wrapper: true,
          transition: true,
        })}
        style={{
          transform: `translateX(${(-100 / imgUrl.length) * slider}%)`,
          width: `${100 * imgUrl.length}%`,
        }}
      >
        {/* <img src={imgUrl[imgUrl.length-1]} alt=""/> */}
        {imgUrl.map(item => {
          return (
            <img src={item} style={{ width: `${100 / imgUrl.length}%` }} />
          );
        })}
        {/* <img src={imgUrl[0]} alt=""/> */}
      </div>

      <div
        className="button right"
        onClick={() => {
          setSlider(slider + 1);
        }}
      >
        {' '}
        👉{' '}
      </div>
      <div
        className="button left"
        onClick={() => {
          setSlider(slider - 1);
        }}
      >
        {' '}
        👈{' '}
      </div>
    </div>
  );
};

export default Carousel;
