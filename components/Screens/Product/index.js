import {Component} from 'react';
import cx from 'classnames';
import {inject, observer} from 'mobx-react';
import styles from './index.sass';
import {withRouter} from 'next/router';
import {phrases} from 'utils/phrases';
import {isEqual} from 'lodash';
import {Container, Row, Col} from 'components/Base/Grid';
import Button from 'components/Base/Button';
import Toggle from 'components/Base/Toggle';
import Categories from 'components/Modules/Categories';
import * as S from './$$';
import Settings from 'config';

@inject('store')
@observer
class Product extends Component {
  render() {
    const {store, router} = this.props;
    const productSlug = router.query.product;
    const productItemId = router.query.product_item;
    const product = store.findProduct(productSlug);
    const productItem = store.findProductItem(productItemId) || product.productItems[0];
    const feedback = store.feedback;
    
    return (
      <div className={styles.root}>
        <Categories />
        <Container className={styles.product}>
          <Row>
            <Col className={styles.col1} md='5'>
              <h1 className={styles.title}>{product.title}</h1>
              <p className={styles.description} dangerouslySetInnerHTML={{__html: product.description}} />
              <div className={styles.options}>
                <div className={styles.option}>
                  <span className={styles.option__label}>{phrases.pages.product.category}:</span>
                  <span className={styles.option__value}>{product.category.title}</span>
                </div>
                <div className={cx(styles.option, styles.option_sizes)}>
                  <span className={styles.option__label}>{phrases.pages.product.size}:</span>
                  <span className={styles.option__value}>
                    <For each='item' index='i' of={productItem.sizes}>
                      <button 
                        key={i} 
                        className={cx(
                          styles.option__size, 
                          {[styles.option__size_active]: productItem.size === item}
                        )}
                        onClick={() => productItem.goSize(item)}
                        disabled={productItem.size === item}
                      >
                        {item}
                      </button>
                    </For>
                  </span>
                </div>
                <div className={cx(styles.option, styles.option_colors)}>
                  <span className={styles.option__label}>{phrases.pages.product.color}:</span>
                  <span className={styles.option__values}>
                    <For each='group' index='i' of={productItem.colorsGroups}>
                      <button 
                        key={i} 
                        className={cx(
                          styles.color, 
                          {[styles.color_active]: isEqual(productItem.colors, group)}
                        )}
                        disabled={!productItem.checkColors(group) || isEqual(productItem.colors, group)}
                        title={group.map(item => item.title).join('-')}
                        onClick={() => productItem.goColors(group)}
                      >
                        <For each='color' index='i' of={group}>
                          <span key={i} className={styles.color__section} style={{background: color.code}} />
                        </For>
                      </button>
                      <If condition={i > 0 && (i + 1) % 6 === 0}>
                        <span className={styles.br} />
                      </If>
                    </For>
                  </span>
                </div>
              </div>
              <div className={styles.characts}>
                <div className={styles.charact}>
                  <span className={styles.charact__label}>{phrases.pages.product.size}</span>
                  <span className={styles.charact__value}>{productItem.size}</span>
                </div>
                <div className={cx(styles.charact, styles.charact_colors)}>
                  <span className={styles.charact__label}>{phrases.pages.product.color}</span>
                  <button  
                    className={cx(
                      styles.color, 
                      {[styles.color_active]: true}
                    )}
                    title={productItem.colors.map(item => item.title).join('-')}
                  >
                    <For each='color' index='i' of={productItem.colors}>
                      <span key={i} className={styles.color__section} style={{background: color.code}} />
                    </For>
                  </button>                
                </div>
                <div className={styles.charact}>
                  <span className={styles.charact__label}>{phrases.pages.product.delivery}</span>
                  <span className={styles.charact__value}>10 дней</span>
                </div>
              </div>
              <div className={styles.price}>{productItem.price} ₽</div>
              <div className={styles.controls}>
                <Button onClick={productItem.addToCart}>{phrases.pages.product.to_cart}</Button>
                <br className={styles.controls__br} />
                <Button
                  onClick={() => feedback.toggle(phrases.pages.product.another_design, `хочу такой товар ${Settings.host}${product.url}, но ...`)}
                  className={styles.another}
                  kind='link'
                  color='gray'
                >{phrases.pages.product.another_design}</Button>
              </div>
            </Col>
            <Col className={styles.col2} md='6' mdOffset='1'>
              <S.Slider className={styles.slider} productItem={productItem} images={productItem.images} title={product.title} />
            </Col>
          </Row>
        </Container>
        <Toggle>
          <If condition={product.adviced.length > 0}>
            <S.Ads className={styles.ads} products={product.adviced} />
          </If>
        </Toggle>
      </div>
    )
  }
}

Product.displayName = 'Screens/Product';

export default withRouter(Product);