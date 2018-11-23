import {Component} from 'react';
import cx from 'classnames';
import {inject, observer} from 'mobx-react';
import {throttle} from 'lodash';
import styles from './index.sass';
import {scrollTo} from 'utils/utils';
import {phrases} from 'utils/phrases';
import {Container, Row, Col} from 'components/Base/Grid';

@inject('store')
@observer
class Desktop extends Component {
  SHIFT = 80;
  _stickied = React.createRef();

  state = {
    currentQuestion: phrases.faq.questions[0].id,
    fixedTop: false,
    absoluteBottom: false,
    left: null
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onResize);

    this.updateFilterPosition();
    this.setState({lastScrollPos: window.scrollY});

    if (window.location.hash) {
      const urlParams = window.location.hash.split('#');
  
      if (urlParams[urlParams.length - 1]) {
        scrollTo(urlParams[urlParams.length - 1], false, -100);
        this.setState({
          currentQuestion: urlParams[urlParams.length - 1]
        })
      }
    };
  }

  render() {
    const {currentQuestion, fixedTop, absoluteBottom, left} = this.state;
    
    return (
      <Container className={styles.root}>
        <Row>
          <Col className={styles.sidebar} md={3}>
            <ul 
              ref={this._stickied}
              className={cx(
                styles.menu,
                {[styles.menu_fixedTop]: fixedTop},
                {[styles.menu_absoluteBottom]: absoluteBottom}
              )}
              style={{left: left, top: fixedTop ? this.SHIFT : null}}
            >
              <For each='faq' of={phrases.faq.questions}>
                <li key={faq.id} className={cx({[styles.menu__active]: faq.id === currentQuestion})}>
                  <a href={`#${faq.id}`} onClick={() => this.scrollTo(faq.id)}>
                    {faq.question}
                  </a>
                </li>
              </For>
            </ul>
          </Col>
          <Col md={9}>
            <For each='faq' of={phrases.faq.questions}>
              <div key={faq.id} id={faq.id} className={cx(styles.answer, {[styles.answer__active]: faq.id === currentQuestion})}>
                <h5>{faq.question}</h5>
                <div dangerouslySetInnerHTML={{__html: faq.answer}} />
              </div>
            </For>
          </Col>
        </Row>
      </Container>
    )
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  }
  
  onScroll = throttle(() => {
    this.updateFilterPosition();
  }, 10)

  onResize = throttle(() => {
    this.updateFilterPosition();
  }, 500)

  updateFilterPosition = () => {
    const stickiedNode = (this._stickied && this._stickied.current) || null;
    if (!stickiedNode) return;
    const parentNode = stickiedNode.parentNode;
    let fixedTop = false;
    let absoluteBottom = false;
    let left = null;

    if (
      (window.scrollY + this.SHIFT) > parentNode.offsetTop &&
      (parentNode.offsetHeight - this.SHIFT) > stickiedNode.offsetHeight
    ) {
      if (parentNode.getBoundingClientRect().bottom <= (stickiedNode.offsetHeight + this.SHIFT)) {
        absoluteBottom = true;
      } else {
        fixedTop = true;
        left = parentNode.getBoundingClientRect().left + 10;
      }
    }

    this.setState({
      fixedTop: fixedTop,
      absoluteBottom: absoluteBottom,
      left: left
    })
  }  

  scrollTo = (id) => {
    scrollTo(id, false, -100)
    this.setState({
      currentQuestion: id
    })
  }
}

Desktop.displayName = 'Screens/Faq/Desktop';

export default Desktop;
