import cx from 'classnames';
import styles from './index.sass';

const Section = ({className, ...props}) => (
  <div className={cx(styles.root, className)} {...props}>
    {props.children}
  </div>
);

Section.displayName = 'Modules/Grid/Section';

export default Section;
