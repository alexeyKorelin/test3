import {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import Settings from 'config';
import {phrases} from 'utils/phrases';
import {Link} from 'routes';
import {throttle} from 'lodash';
import {Container} from 'components/Base/Grid';
import * as S from '../$$';
import Sidebar from 'components/Modules/Sidebar';

class Header extends Component {
  state = {
    menuIsOpen: false,
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

  render () {
    const {className, itemsCount, router} = this.props;
    const {menuIsOpen, scrolled} = this.state;
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
        <button className={styles.menu} onClick={this.open}>
          <svg className={styles.menu__img} width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <rect y='10' width='6' height='6' />
            <rect width='6' height='6' />
            <rect x='10' y='10' width='6' height='6' />
            <rect x='10' width='6' height='6' />
          </svg>
        </button>
        <Sidebar
          className={styles.sidebar}
          contentClassName={styles.sidebar__content}
          isOpen={menuIsOpen}
          onClose={this.close}
        >
          <ul className={styles.links}>
            <li className={styles.links__li}>
              <Link route='/'>
                <a onClick={this.close} className={styles.links__a}>главная</a>
              </Link>
            </li>
            <li className={styles.links__li}>
              <Link route='/cart'>
                <a onClick={this.close} className={styles.links__a}>корзина</a>
              </Link>
            </li>
            <li className={styles.links__li}>
              <Link route='/all'>
                <a onClick={this.close} className={styles.links__a}>каталог</a>
              </Link>
            </li>
            <li className={styles.links__li}>
              <Link route='/faq'>
                <a onClick={this.close} className={styles.links__a}>faq</a>
              </Link>
            </li>
            <li className={styles.links__li}>
              <Link route='/'>
                <a onClick={this.close} className={styles.links__a}>о нас</a>
              </Link>
            </li>
            <li className={styles.links__li}>
              <Link route='/'>
                <a onClick={this.close} className={styles.links__a}>оплата</a>
              </Link>
            </li>
            <li className={styles.links__li}>
              <Link route='/'>
                <a onClick={this.close} className={styles.links__a}>доставка</a>
              </Link>
            </li>
            <li className={styles.links__li}>
              <a onClick={this.close} className={styles.links__a} target='_blank' href='/'>instagram</a>
            </li>
          </ul>
          <div className={styles.info}>
            <div className={styles.address}>{phrases.site.address}</div>
            <a className={styles.phone} href={`tel:${phrases.site.phone}`}>{phrases.site.phone}</a>
          </div>
        </Sidebar>
        <Link route='/'>  
          <a className={styles.logo}>
            <img 
              className={styles.logo__img} 
              src={`${Settings.assetHost}/assets/pallet-logo-wh.svg`} 
              alt={phrases.site.name} 
              title={phrases.site.name} 
            />
            <img 
              className={styles.logo__img} 
              src={`${Settings.assetHost}/assets/pallet-logo-bl.svg`} 
              alt={phrases.site.name} 
              title={phrases.site.name} 
            />
          </a>
        </Link>
        <S.Cart className={styles.cart} color={(isMain && !scrolled) ? 'black' : 'white'} itemsCount={itemsCount} />
      </header>
    )
  }

  open = () => this.setState({menuIsOpen: true});

  close = () => this.setState({menuIsOpen: false});

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
