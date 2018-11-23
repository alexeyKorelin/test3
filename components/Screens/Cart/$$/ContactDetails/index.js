import {Component} from 'react';
import cx from 'classnames';
import {inject, observer} from 'mobx-react';
import styles from './index.sass';
import {Row, Col} from 'components/Base/Grid';
import TextInput from 'components/Base/Form/TextInput';
import TextArea from 'components/Base/Form/TextArea';

@observer
class ContactDetails extends Component {
  render() {
    const { cart, order, errors, onChange } = this.props;

    if (cart && !cart.order) return null;

    return (
      <Row>
        <Col md={6}>
          <TextInput 
            id='first_name' 
            name='first_name'
            label='имя'
            value={order ? order.first_name : cart.order.first_name}
            onChange={onChange}
            disabled={order}
            error={errors && errors.first_name}
          />
          <TextInput
            id='phone'
            name='phone'
            label='телефон'
            mask="+7 (999) 999-99-99"
            maskChar="_"
            value={order ? order.phone : cart.order.phone}
            onChange={onChange}
            disabled={order}
            error={errors && errors.phone}
          />
          <TextInput
            id='email'
            name='email'
            label='e-mail'
            value={order ? order.email : cart.order.email}
            onChange={onChange}
            disabled={order}
            error={errors && errors.email}
          />
        </Col>
        <Col md={6}>
          <TextArea
            id='description'
            name='description'
            label='комментарий'
            className={styles.comment}
            count={500}
            value={order ? order.description : cart.order.description}
            onChange={onChange}
            disabled={order}
          />
        </Col>
      </Row>
    )
  }
}

ContactDetails.displayName = 'Screens/Cart/ContactDetails';

export default ContactDetails;