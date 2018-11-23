import cx from 'classnames';
import styles from './index.sass';
import Settings from 'config';
import {phrases} from 'utils/phrases';
import {Link} from 'routes';

const Cart = ({className, color, itemsCount}) => (
  <Link route='/cart'>
    <a className={cx(styles.root, className, styles[`root_${color || 'white'}`])}>
      <span className={styles.label}>{phrases.header.cart.title}</span>
      <span className={styles.icon}>
        <svg className={styles.svg} preserveAspectRatio='none' width='15' height='20' viewBox='0 0 15 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path className={styles.svg__path} fillRule='evenodd' clipRule='evenodd' d='M10.3607 4.2639H14.2381L14.9492 19.9979H0L0.710824 4.2639H4.59144V2.79197C4.59144 1.25255 5.88562 0 7.47622 0C9.06714 0 10.3607 1.25255 10.3607 2.79197V4.2639ZM7.47658 0.628031C6.24431 0.628031 5.24066 1.59903 5.24066 2.79166V4.26359H9.71087V2.79166C9.71087 1.59938 8.7085 0.628031 7.47658 0.628031Z' />
        </svg> 
        {itemsCount}     
      </span>
    </a>
  </Link>
)

Cart.displayName = 'Modules/Header/Cart';

export default Cart;
