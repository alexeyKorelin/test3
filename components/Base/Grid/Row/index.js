import cx from 'classnames';
import styles from './index.sass';

const Row = ({children, className, indents}) => 
  <div 
    className={cx(
      styles.root, 
      className
    )}
  >
    {children}
  </div>;

Row.displayName = 'Modules/Grid/Row';

export default Row;