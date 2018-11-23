import {Component} from 'react';
import cx from 'classnames';
import {inject, observer} from 'mobx-react';
import styles from './index.sass';
import {Container, Row, Col} from 'components/Base/Grid';
import Button from 'components/Base/Button';

class IsEmptyCart extends Component {
  render() {
    return (
      <Container className={styles.root}>
        <h1>Корзина пуста</h1>
        <p>Вы еще ничего не добавили в корзину</p>
        <Button href='/'>Перейти в каталог</Button>
      </Container>
    )
  }
}

IsEmptyCart.displayName = 'Screens/Cart/IsEmptyCart';

export default IsEmptyCart;
