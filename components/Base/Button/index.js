import React from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {Link} from 'routes';

const Button = ({className, href, external, kind, color, block, nounderline, reverse, ...props}) => href ? (
  external ? (
    <a 
      href={href}
      className={cx(
        styles.root, 
        className, 
        styles[kind || 'primary'], 
        styles[color || 'black'],  
        {
          [styles.block]: block,
          [styles.nounderline]: nounderline,
          [styles.reverse]: reverse
        }
      )}
      {...props} 
    />
  ) : (
    <Link route={href} prefetch>
      <a 
        className={cx(
          styles.root, 
          className, 
          styles[kind || 'primary'], 
          styles[color || 'black'], 
          {
            [styles.block]: block,
            [styles.nounderline]: nounderline,
            [styles.reverse]: reverse
          }
        )}
        {...props} 
      />
    </Link>    
  )
) : (
  <button 
    className={cx(
      styles.root, 
      className, 
      styles[kind || 'primary'], 
      styles[color || 'black'], 
      {
        [styles.block]: block,
        [styles.nounderline]: nounderline,
        [styles.reverse]: reverse
      }
    )} 
    {...props} 
  />
);

Button.displayName = 'Base/Button';

export default Button;
