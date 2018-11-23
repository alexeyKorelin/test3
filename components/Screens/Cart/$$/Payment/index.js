import {Component} from 'react';
import cx from 'classnames';
import {inject, observer} from 'mobx-react';
import styles from './index.sass';
import {Row, Col} from 'components/Base/Grid';
import RadioButton from 'components/Base/Form/RadioButton';
import {phrases} from 'utils/phrases';
import Settings from 'config';

@observer
class Payment extends Component {
  render() {
    const { cart, order, onChange } = this.props;

    if (cart && !cart.order) return null;

    return (
      <Row className={styles.root}>
        <If condition={order}>
          <Col>{phrases.order.payment_types[order.payment_type]}</Col>
        </If>
        <If condition={cart}>
          <Col xs={6} sm={4} md={4}>
            <RadioButton
              name='payment_type'
              label='наличными курьеру' 
              className={styles.radioButton} 
              value='cash'
              checked={cart.order.payment_type === 'cash'}
              onChange={onChange}
            />
          </Col>
          <Col xs={6} sm={8} md={8}>
            <RadioButton
              name='payment_type'
              label='онлайн' 
              className={styles.radioButton} 
              value='card'
              checked={cart.order.payment_type === 'card'}
              onChange={onChange}
            />
            <div className={styles.logo}>
              <img src={`${Settings.assetHost}/assets/visa.svg`} alt='visa' title='visa' width='63' height='21' />
              <img src={`${Settings.assetHost}/assets/mir.svg`} alt='mir' title='mir' width='72' height='20' />
              <img src={`${Settings.assetHost}/assets/mastercard.svg`} alt='mastercard' title='mastercard' width='123' height='28' />
            </div>
          </Col>
        </If>
      </Row>
    )
  }
}

Payment.displayName = 'Screens/Cart/Payment';

export default Payment;
