import cx from 'classnames';
import styles from './index.sass';
import Settings from 'config';

const Payments = ({className}) => (
  <div className={cx(styles.root, className)}>
    <img 
      className={styles.logo}
      src={`${Settings.assetHost}/assets/visa-wh.svg`} 
      alt='visa' 
      title='visa' 
    />
    <img 
      className={styles.logo}
      src={`${Settings.assetHost}/assets/mir-wh.svg`} 
      alt='mir' 
      title='mir' 
    />
    <img 
      className={styles.logo}
      src={`${Settings.assetHost}/assets/mastercard-wh.svg`} 
      alt='mastercard' 
      title='mastercard'
    />
  </div>
)

Payments.displayName = 'Modules/Payments';

export default Payments;
