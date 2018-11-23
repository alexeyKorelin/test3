import React from 'react';
import cx from 'classnames';
import styles from './index.sass';
import Expander from 'components/Base/Expander';

const TextExpander = ({className, label, description, isOpen, onClick, ...props}) => (
  <div className={cx(className, styles.root, {[styles.root_open]: isOpen})} {...props}>
    <button className={styles.title} onClick={onClick}>{label}</button>
    <Expander isOpen={isOpen} duration={500}>
      <div className={styles.description} dangerouslySetInnerHTML={{__html: description}} />
    </Expander>  
  </div>
);

TextExpander.displayName = 'Base/TextExpander';

export default TextExpander;
