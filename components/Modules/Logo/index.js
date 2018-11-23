import cx from 'classnames';
import styles from './index.sass';

const Logo = ({className, kind}) => (
  <svg className={cx(styles.root, className, styles[`root_${kind || 'dark'}`])} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect width='8.33333' height='8.33333' />
    <rect y='11.6667' width='8.33333' height='8.33333' />
    <rect x='11.667' width='8.33333' height='8.33333' />
    <rect x='11.667' y='11.6667' width='8.33333' height='8.33333' />
  </svg>
)

Logo.displayName = 'Modules/Logo';

export default Logo;
