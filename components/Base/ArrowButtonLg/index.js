import cx from 'classnames';
import styles from './index.sass';
import FontIcon from 'components/Base/FontIcon';

const ArrowButtonLg = ({className, arrowClassName, kind, onClick}) => (
  <button
    className={cx(
      styles.root,
      arrowClassName,
      className
    )}
    onClick={onClick}
  >
    <FontIcon
      className={styles.icon}  
      i={kind} 
    />
  </button>
);

ArrowButtonLg.displayName = 'Base/ArrowButtonLg';

export default ArrowButtonLg;
