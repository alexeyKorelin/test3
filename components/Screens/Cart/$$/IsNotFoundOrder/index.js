import {Component} from 'react';
import cx from 'classnames';
import {inject, observer} from 'mobx-react';
import styles from './index.sass';
import {Container, Row, Col} from 'components/Base/Grid';
import Button from 'components/Base/Button';

class IsNotFoundOrder extends Component {
  render() {
    return (
      <Container className={styles.root}>
        <h1>Заказ не найден =(</h1>
        <p>К сожалению мы не смогли найти такой заказ.</p>
        <Button href='/'>Перейти в каталог</Button>
      </Container>
    )
  }
}

IsNotFoundOrder.displayName = 'Screens/Cart/IsNotFoundOrder';

export default IsNotFoundOrder;
