import {Component} from 'react';
import cx from 'classnames';
import Settings from 'config';
import styles from './index.sass';
import {Link} from 'routes';

const Rubric = ({className, href, image, title, description}) => (
  <div className={styles.root}>
    <div className={styles.top}>
      <img className={styles.img} src={`${image}`} alt={title} title={title} />
    </div>
    <div className={styles.bottom}>
      <h6 className={styles.title}>{title}</h6>
      <p className={styles.description} dangerouslySetInnerHTML={{__html: description}} />
    </div>
  </div>
);

Rubric.displayName = 'Modules/Rubric';

export default Rubric;
