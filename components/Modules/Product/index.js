import {Component} from 'react';
import cx from 'classnames';
import {observer} from 'mobx-react';
import Settings from 'config';
import styles from './index.sass';
import {Link} from 'routes';
import {phrases} from 'utils/phrases';
import Button from 'components/Base/Button';

class Product extends Component {
  state = {
    inCart: false
  }

  render () {
    const {inCart} = this.state;
    const {className, product} = this.props;

    return (
      <div className={cx(styles.root, className)}>
        <div className={styles.link}>  
          <Link route={product.url}>
            <a className={styles.top}>
              <img className={styles.thumb} src={product.avatar.thumb || `${Settings.assetHost}/assets/tile-dummy.png`} alt={product.product.title} title={product.product.title} />
            </a>
          </Link>
        </div>
        <div className={styles.controls}>  
          <Link route={product.url}>          
            <a className={styles.bottom}>
              <h6 className={styles.title}>{product.product.title}</h6>
              <span className={styles.price}>{product.price} ₽</span>
            </a>
          </Link>
          <div className={styles.cart}>
            <Button className={styles.add} onClick={this.onClick} reverse>{phrases.product.add_to_cart}</Button>
          </div>
        </div>
      </div>
    )
  }

  onClick = () => {
    this.props.product.addToCart();
    this.setState({inCart: true});

    setTimeout(this.setState({inCart: false}))
  }
}

Product.displayName = 'Modules/Product';

export default Product;
