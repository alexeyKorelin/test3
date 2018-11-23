import {Component} from 'react';
import cx from 'classnames';
import {inject, observer} from 'mobx-react';
import styles from './index.sass';
import Button from 'components/Base/Button';
import {phrases} from 'utils/phrases';

@observer
class Total extends Component {
  render() {
    const { cart, order, saveOrder } = this.props;
    const delivery_cost = cart && cart.order && cart.order.delivery === 'courier' ? 1000 : 0

    return (
      <div className={styles.root}>
        <table className={styles.table}>
          <tbody>
            <If condition={order && order.uuid}>
              <tr>
                <td className={styles.label}>статус заказа:</td>
                <td className={styles.right}>{phrases.order.statuses[order.status]}</td>
              </tr>
              <tr>
                <td className={styles.label}>статус оплаты:</td>
                <td className={styles.right}>{phrases.order.payment_statuses[order.payment_status]}</td>
              </tr>
            </If>
            <tr>
              <td className={styles.label}>заказ на сумму:</td>
              <td className={styles.right}>{order ? order.total : cart.total} ₽</td>
            </tr>
            <tr>
              <td className={styles.label}>доставка:</td>
              <td className={styles.right}>
                <If condition={order && order.delivery === 'courier'}>1000 ₽</If>
                <If condition={order && order.delivery === 'pickup'}>бесплатно</If>
                <If condition={cart && !cart.order}>не выбрана</If>
                <If condition={cart && cart.order && cart.order.delivery === 'courier'}>1000 ₽</If>
                <If condition={cart && cart.order && cart.order.delivery === 'pickup'}>бесплатно</If>
              </td>
            </tr>
            <tr className={styles.separator}>
              <td className={styles.label}>итого:</td>
              <td className={cx(styles.right, styles.bold)}>{order ? order.amount : cart.total + delivery_cost} ₽</td>
            </tr>
          </tbody>
        </table>
        <If condition={cart || order && order.payment_status !== 'completed'}>
          <Button onClick={order ? order.pay : cart.order ? saveOrder : cart.buildOrder} kind='primary' block>
            <If condition={cart}>
              {cart.order ? 'оформить заказ' : 'подтвердить заказ'}
            </If>
            <If condition={order}>перейти к оплате</If>
          </Button>
        </If>
        <If condition={!order && cart}>
          <div className={styles.clear}>
            <Button onClick={cart.clear} kind='link'>очистить корзину</Button>
          </div>
        </If>
      </div>
    )
  }
}

Total.displayName = 'Modules/Cart/Total';

export default Total;
