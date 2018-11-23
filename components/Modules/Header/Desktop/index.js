import {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import Settings from 'config';
import {phrases} from 'utils/phrases';
import {Link} from 'routes';
import {throttle} from 'lodash';
import {Container, Section} from 'components/Base/Grid';
import * as S from '../$$';

class Header extends Component {
  state = {
    scrolled: false
  }

  componentDidMount() {
    this.updatescrolled();
    window.addEventListener('scroll', this.onScroll);
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
  }

  render() {
    const {scrolled} = this.state;
    const {className, itemsCount, router} = this.props;
    const isMain = router.route == '/';

    return (
      <header 
        className={cx(
          styles.root, 
          {
            [styles.root_isMain]: isMain,
            [styles.root_scrolled]: scrolled
          }
        )}
      >
        <Container className={styles.inner}>
          <Link route='/'>
            <a className={styles.logo}>
              <img className={styles.logo__img} src={`${Settings.assetHost}/assets/pallet-logo-wh.svg`} alt={phrases.site.name} title={phrases.site.name} />
              <img className={styles.logo__img} src={`${Settings.assetHost}/assets/pallet-logo-bl.svg`} alt={phrases.site.name} title={phrases.site.name} />
            </a>
          </Link>
          <div className={styles.menu}>
            <Link route='/all'>
              <a>
                {phrases.header.menu.catalog}
              </a>
            </Link>
            <Link route='/faq'>
              <a>
                {phrases.header.menu.faq}
              </a>
            </Link>
          </div>
          <div className={styles.right}>
            <span className={styles.phone}>
              {phrases.site.phone}
            </span>
            <S.Cart color={(isMain && !scrolled) ? 'black' : 'white'} itemsCount={itemsCount} />
          </div>
        </Container>
      </header>  
    )
  }

  onScroll = throttle(() => {
    this.updatescrolled();
  }, 5);

  onResize = throttle(() => {
    this.updatescrolled();
  }, 5);

  updatescrolled = () => {
    const {scrolled} = this.state;
    
    (window.document.body.getBoundingClientRect().top < 0) ? (!scrolled && this.setState({scrolled: true})) : this.setState({scrolled: false});    
  }  
}

Header.displayName = 'Modules/Header';

export default Header;
