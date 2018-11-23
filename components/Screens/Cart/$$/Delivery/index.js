import {Component} from 'react';
import cx from 'classnames';
import {inject, observer} from 'mobx-react';
import styles from './index.sass';
import {Row, Col} from 'components/Base/Grid';
import RadioButton from 'components/Base/Form/RadioButton';
import TextInput from 'components/Base/Form/TextInput';
import {obtainGoogleSuggest, locationLabel} from 'utils/geo';
import {phrases} from 'utils/phrases';

@observer
class Delivery extends Component {
  onSuggestSelect = (value) => {
    const { cart } = this.props;
    if (value) {
      const options = obtainGoogleSuggest(value);
      cart.order.applyChanges({ address: options });
    }
  }

  render() {
    const { cart, order, onChange } = this.props;

    if (cart && !cart.order) return null;

    return (
      <Row>
        <If condition={order}>
          <Col>{phrases.order.delivery_types[order.delivery]}</Col>
        </If>
        <If condition={cart}>
          <Col xs={6} sm={4} md={4}>
            <RadioButton
              name='delivery'
              label='самовывоз' 
              className={styles.radioButton} 
              value='pickup'
              checked={cart.order.delivery === 'pickup'}
              onChange={onChange}
            />
          </Col>
          <Col xs={6} sm={4} md={4}>
            <RadioButton
              name='delivery'
              label='курьер' 
              className={styles.radioButton} 
              value='courier'
              checked={cart.order.delivery === 'courier'}
              onChange={onChange}
            />
          </Col>
        </If>
        <If condition={(cart && cart.order && cart.order.delivery === 'courier') || (order && order.delivery === 'courier')}>
          <Col md={12} className={styles.address}>
            <TextInput
              id='address'
              name='address'
              label='адрес'
              placeholder='Введите адрес...'
              initialValue={order ? locationLabel(order.address) : ''}
              onSuggestSelect={this.onSuggestSelect}
              disabled={order}
            />
          </Col>
        </If>
      </Row>
    )
  }
}

Delivery.displayName = 'Screens/Cart/Delivery';

export default Delivery;
