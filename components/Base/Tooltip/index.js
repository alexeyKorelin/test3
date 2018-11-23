import React from 'react';
import cx from 'classnames';
import styles from './index.sass';
import FontIcon from 'components/Base/FontIcon';

const Tooltip = ({className, size, children, ...props}) => (
  <div className={cx(className, styles.root)}>
    <FontIcon i={'question'} size={size || 12}/>
    <div className={styles.text}>{children}</div>
  </div>
);

Tooltip.displayName = 'Base/Tooltip';

export default Tooltip;