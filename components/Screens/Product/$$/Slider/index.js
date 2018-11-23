import React, {Component} from 'react';
import cx from 'classnames';
import slickStyles from 'slick-carousel/slick/slick.css';
import {observer} from 'mobx-react';
import styles from './index.sass';
import SlickSlider from 'react-slick';
import {throttle} from 'lodash';
import {isXs, isSm} from 'utils/utils';
import FontIcon from 'components/Base/FontIcon';
import Toggle from 'components/Base/Toggle';
import ImagesZoom from 'components/Base/ImagesZoom';
import Preloader from 'components/Base/Preloader';

@observer
class Slider extends Component {
  _slider = React.createRef();

  state = {
    active: 0,
    zoom: false,
    dragging: false,
    height: false
  }

  componentDidMount() {
    this.props.productItem.loadImages();
    if (isXs()) this.slidesSizeUpdate();
    window.addEventListener('resize', this.onResize);
    window.addEventListener('touchstart', this.touchStart);
    window.addEventListener('touchmove', this.preventTouch, {passive: false});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.productItem.id !== this.props.id) {
      nextProps.productItem.loadImages();

      this.goTo(0);
    }
  }

  render () {
    const {active, zoom, height} = this.state;
    const {images, title, className} = this.props;
    const settings = {
      dots: false,
      arrows: false,
      infinite: true,
      beforeChange: (current, next) => this.setState({active: next, dragging: true}),
      afterChange: (index) => { 
        this.setState({dragging: false}); 
      }
    }
    
    return (
      <div className={cx(styles.root, className)}>
        <style dangerouslySetInnerHTML={{ __html: slickStyles }} />
        <SlickSlider ref={this._slider} className={styles.slider} {...settings}>
          <For each='image' index='i' of={images}>
            <div
              key={i} 
              className={styles.slide} 
              alt={title} 
              title={title}
              onClick={this.zoomOpen}
            >
              <div 
                className={styles.slide__inner}
                style={{height: height}}
              >
                <Toggle>
                  <Choose> 
                    <When condition={!image.midLoad}>
                      <Preloader className={styles.preloader} key='preloader' />
                    </When>
                    <Otherwise>
                      <img key='image' className={styles.slide__img} src={image.mid} />
                    </Otherwise>
                  </Choose>
                </Toggle>
              </div>
            </div>
          </For>
        </SlickSlider>
        <If condition={images.length > 1}>
          <div className={styles.controls}>
            <button className={styles.arrow} onClick={this.prev}>
              <FontIcon i='prev' />
            </button>
            <For each='item' index='i' of={images}>
              <button key={i} className={cx(styles.page, {[styles.page_active]: active === i})} onClick={() => this.goTo(i)}>{(i < 9) && '0'}{i+1}</button>
            </For>
            <button className={styles.arrow} onClick={this.next}>
              <FontIcon i='next' />
            </button>
          </div>
        </If>
        <Toggle>
          <If condition={zoom}>
            <ImagesZoom images={images} initialSlide={active} close={this.zoomClose} goTo={this.goTo} />
          </If>
        </Toggle>
      </div>
    )
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('touchstart', this.touchStart);
    window.removeEventListener('touchmove', this.preventTouch, {passive: false});
  }

  onResize = throttle(() => {
    this.slidesSizeUpdate();
  }, 200);

  slidesSizeUpdate = () => {
    if (isXs()) {
      this.setState({height: window.innerWidth});
    } else {
      this.setState({height: false});
    }
  }

  touchStart(e){
    this.firstClientX = e.touches[0].clientX;
    this.firstClientY = e.touches[0].clientY;
  }

  preventTouch(e){
    if (isSm()) {
      const minValue = 20;

      this.clientX = e.touches[0].clientX - this.firstClientX;
      this.clientY = e.touches[0].clientY - this.firstClientY;

      if (Math.abs(this.clientX) > minValue && e.cancelable) { 
          e.preventDefault();
          e.returnValue = false;
          return false;
      }
    }
  } 

  prev = () => this._slider.current.slickPrev();

  next = () => this._slider.current.slickNext();

  goTo = (i) => {
    this._slider.current.slickGoTo(i);    
  }

  zoomOpen = () => !this.state.dragging && this.setState({zoom: true});

  zoomClose = (i) => this.setState({zoom: false});
}


Slider.displayName = 'Screens/Product/Slider';

export default Slider;