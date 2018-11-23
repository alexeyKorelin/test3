import {Component} from 'react';
import cx from 'classnames';
import Settings from 'config';
import styles from './index.sass';
import {Link} from 'routes';
import {phrases} from 'utils/phrases';
import {Container, Row, Col} from 'components/Base/Grid';
import Product from 'components/Modules/Product';
import Button from 'components/Base/Button';

const Products = ({className, products, toNextPage, showMore}) => (
  <Container className={cx(styles.root, className)}>  
    <Row>
      <For each='product' index='i' of={products}>
        <If condition={product.product}>
          <Col key={product.id} xs='6' md='4' className={styles.product}>
            <Product product={product} />
          </Col>
        </If>
      </For>
    </Row>
    <div className={styles.controls}>
      <If condition={showMore}>
        <Button onClick={toNextPage} className={styles.more}>{phrases.products.more}</Button>
      </If>
    </div>
  </Container>
);

Products.displayName = 'Modules/Products';

export default Products;
