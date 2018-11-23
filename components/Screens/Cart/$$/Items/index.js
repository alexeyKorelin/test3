import {Component} from 'react';
import cx from 'classnames';
import {inject, observer} from 'mobx-react';
import {Link} from 'routes';
import styles from './index.sass';
import {Row, Col} from 'components/Base/Grid';
import TextInput from 'components/Base/Form/TextInput';
import FontIcon from 'components/Base/FontIcon';

@observer
class Items extends Component {
  render() {
    const { cart, order } = this.props;
    
    return (
      <div>
        <For each='item' index='i' of={order ? order.items : cart && cart.items}>
          <Row key={i} className={styles.item}>
            <If condition={cart}>
              <FontIcon i={'close'} size={12} onClick={() => cart.remove(item.product_item_id)} />
            </If>
            <Col className={styles.thumb}>
              <Link route={item.productItem.product.url}>
                <a>
                  <img src={item.productItem.avatar.thumb} alt={item.productItem.product.title} title={item.productItem.product.title} />
                </a>
              </Link>
            </Col>
            <Col className={styles.title__mobile}>
              <h3 className={styles.title}>
                <Link route={item.productItem.product.url}>
                  <a>
                    {item.productItem.product.title}
                  </a>
                </Link>
              </h3>
            </Col>
            <Col className={styles.right}>
              <Row className={styles.title__desktop}>
                <Col>
                  <h3 className={styles.title}>
                    <Link route={item.productItem.product.url}>
                      <a>
                        {item.productItem.product.title}
                      </a>
                    </Link>
                  </h3>
                </Col>
              </Row>
              <Row className={styles.options__row}>
                <Col className={styles.options}>
                  <div><span>категория:</span> {item.productItem.category.title}</div>
                  <div><span>размер:</span> {item.productItem.size}</div>
                  <div className={styles.color}>
                    <span>цвет:</span>
                    <If condition={item.productItem.colors.length === 1}>
                      <span style={{background: item.productItem.colors[0].code}}></span>
                    </If>
                    <If condition={item.productItem.colors.length > 1}>
                      <span style={{
                        background: `linear-gradient(
                          to right,
                          ${item.productItem.colors[0].code} 0%, ${item.productItem.colors[0].code} 50%,
                          ${item.productItem.colors[1].code} 50%, ${item.productItem.colors[1].code} 100%
                        )`
                      }}></span>
                    </If>
                  </div>
                </Col>
                <Col className={styles.quantity}>
                  <If condition={cart}>
                    <span>количество</span>
                    <TextInput
                      id='quantity'
                      name='quantity'
                      type='number'
                      min='1'
                      value={item.quantity}
                      onChange={(e) => item.setQuantity(e.target.value)}
                    />
                  </If>
                  <If condition={order}>
                    <span>{item.quantity} шт.</span>
                  </If>
                </Col>
                <Col className={styles.price}>
                  {item.total} ₽
                </Col>
              </Row>
            </Col>
          </Row>
        </For>
      </div>
    )
  }
}

Items.displayName = 'Modules/Cart/Items';

export default Items;
