import {Component} from 'react';
import cx from 'classnames';
import {inject, observer} from 'mobx-react';
import styles from './index.sass';
import {Container, Row, Col} from 'components/Base/Grid';
import Expander from 'components/Base/Expander';
import Tooltip from 'components/Base/Tooltip';
import FontIcon from 'components/Base/FontIcon';
import * as S from './$$';

@observer
class Cart extends Component {
  state = {
    active: false,
    errors: null
  }

  toggle = () => {
    this.setState({active: !this.state.active})
  }

  onChange = (e) => {
    const { cart } = this.props;
    const { name, value } = e.target;
    
    cart.order.applyChanges({[name]: value});
  }

  saveOrder = () => {
    const { cart } = this.props;

    cart.saveOrder()
      .catch(error => {
        this.setState({errors: error.errors})
      })
  }

  render() {
    const { cart, order } = this.props;
    const { active, errors } = this.state;
    
    if (cart && cart.items.length == 0) return <S.IsEmptyCart />
    if (order && order.fetched && !order.uuid) return <S.IsNotFoundOrder />
    
    return order && order.fetched && order.uuid || cart ? (
      <Container className={styles.root}>
        <Row>
          <Col md={8}>
            <h2 className={cx(styles.h2, {[styles.rotate]: cart && cart.order && !active})}>
              {order ? `Заказ #${order.uuid}` : 'Корзина'}
              <FontIcon i={'chevron-down'} size={8} onClick={this.toggle} />
            </h2>
            <Expander isOpen={cart && !cart.order || active || order} duration={500}>
              <S.Items cart={cart} order={order} />
            </Expander>
            <If condition={cart && !cart.order && !order}>
              <div className={styles.mobileTotal}>
                <h2 className={styles.h2}>К оплате</h2>
                <S.Total cart={cart} order={order} saveOrder={this.saveOrder} />
              </div>
            </If>
            <h2 className={cx(styles.h2, {[styles.disable]: cart && !cart.order})}>
              Контактные данные
              <FontIcon i={'chevron-down'} size={8}/>
            </h2>
            <If condition={cart && !cart.order}>
              <div className={styles.info}>Для оформления заказа нажмите кнопку подтвердить заказ</div>
            </If>
            <Expander isOpen={cart && cart.order || order} duration={500}>
              <S.ContactDetails cart={cart} order={order} errors={errors} onChange={this.onChange} />
            </Expander>
            <h2 className={cx(styles.h2, {[styles.disable]: cart && !cart.order})}>
              Оплата и доставка
              <FontIcon i={'chevron-down'} size={8}/>
            </h2>
            <If condition={cart && !cart.order}>
              <div className={styles.info}>Для оформления заказа нажмите кнопку подтвердить заказ</div>
            </If>
            <Expander isOpen={cart && cart.order || order} duration={500}>
              <h4 className={styles.h4}>способ оплаты</h4>
              <S.Payment cart={cart} order={order} onChange={this.onChange} />
              <h4 className={styles.h4}>
                способ доставки
                <Tooltip size={16} className={styles.tooltip}>самовывоз по адресу: Санкт-Петербург, ул. Савушкина 83, корпус 3</Tooltip>
              </h4>
              <S.Delivery cart={cart} order={order} onChange={this.onChange} />
            </Expander>
          </Col>
          <Col md={4} className={styles.mobileTotal__desktop}>
            <h2 className={styles.h2}>{order ? 'Квитанция' : 'К оплате'}</h2>
            <S.Total cart={cart} order={order} saveOrder={this.saveOrder} />
          </Col>
          <If condition={cart && cart.order || order}>
            <Col md={4} className={styles.mobileTotal}>
              <h2 className={styles.h2}>{order ? 'Квитанция' : 'К оплате'}</h2>
              <S.Total cart={cart} order={order} saveOrder={this.saveOrder} />
            </Col>
          </If>
        </Row>
      </Container>
    ) : null
  }
}

Cart.displayName = 'Screens/Cart';

export default Cart;
