import React from 'react';
import Slider from 'react-slick';
import { Component, PropTypes } from '../utils/';

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onWindowResized = this.onWindowResized.bind(this);
  }

  componentDidMount() {
    const { autoplay } = this.props;
    if (autoplay) {
      window.addEventListener('resize', this.onWindowResized);
    }
    this.innerSlider = this.slickcarousel && this.slickcarousel.innerSlider;
  }
  componentWillMount() {
    const { autoplay } = this.props;
    if (autoplay) {
      window.removeEventListener('resize', this.onWindowResized);
    }
  }

  // 自动切换
  onWindowResized() {
    const { autoplay } = this.props;
    if (autoplay && this.slickcarousel && this.slickcarousel.innerSlider && this.slickcarousel.innerSlider.autoPlay) {
      this.slickcarousel.innerSlider.autoPlay();
    }
  }
  next() {
    // https://github.com/akiran/react-slick/blob/master/examples/PreviousNextMethods.js
    this.slickcarousel.slickNext();
  }
  prev() {
    this.slickcarousel.slickPrev();
  }
  goTo(num) {
    // https://github.com/akiran/react-slick/blob/master/examples/SlickGoTo.js
    this.slickcarousel.slickGoTo(num);
  }
  render() {
    const { prefixCls } = this.props;
    const props = { ...this.props };
    props.fade = props.effect === 'fade';
    const cls = this.classNames(prefixCls, {
      [`${prefixCls}-vertical`]: props.vertical,
      [props.className]: props.className,
    });

    return (
      <Slider className={cls} ref={node => this.slickcarousel = node} {...props} />
    );
  }
}

Carousel.defaultProps = {
  prefixCls: 'w-carousel',
  arrows: false, // 左右箭头
  draggable: false, // 拖拽切换
  fade: false, // 切换效果(渐显)
  dots: true, // 是否显示下标
};
Carousel.propTypes = {
  effect: PropTypes.oneOf(['scrollx', 'fade']),
  dots: PropTypes.bool,
  vertical: PropTypes.bool,
  autoplay: PropTypes.bool,
  easing: PropTypes.string,
  appendDots: PropTypes.func,
  beforeChange: PropTypes.func,
  afterChange: PropTypes.func,
  prefixCls: PropTypes.string,
  accessibility: PropTypes.bool,
  nextArrow: PropTypes.any,
  prevArrow: PropTypes.any,
  pauseOnHover: PropTypes.bool,
  className: PropTypes.string,
  adaptiveHeight: PropTypes.bool,
  arrows: PropTypes.bool,
  autoplaySpeed: PropTypes.number,
  centerMode: PropTypes.bool,
  centerPadding: PropTypes.any,
  cssEase: PropTypes.any,
  dotsClass: PropTypes.string,
  draggable: PropTypes.bool,
  fade: PropTypes.bool,
  focusOnSelect: PropTypes.bool,
  infinite: PropTypes.bool,
  initialSlide: PropTypes.number,
  lazyLoad: PropTypes.bool,
  rtl: PropTypes.bool,
  slide: PropTypes.string,
  slidesToShow: PropTypes.number,
  slidesToScroll: PropTypes.number,
  speed: PropTypes.number,
  swipe: PropTypes.bool,
  swipeToSlide: PropTypes.bool,
  touchMove: PropTypes.bool,
  touchThreshold: PropTypes.number,
  variableWidth: PropTypes.bool,
  useCSS: PropTypes.bool,
  slickGoTo: PropTypes.number,
};
