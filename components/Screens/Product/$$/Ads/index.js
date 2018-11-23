import cx from 'classnames';
import styles from './index.sass';
import {phrases} from 'utils/phrases';
import {observer} from 'mobx-react';
import {Container, Row, Section} from 'components/Base/Grid';
import ScrollArea from 'components/Base/ScrollArea';
import Product from 'components/Modules/Product';

const Ads = ({products, className, ...props}) => (
  <Section className={cx(styles.root, className)}>
    <Container>
      <h4 className={styles.title}>{phrases.pages.product.same}</h4>
      <ScrollArea
          className={styles.scrollArea}
          contentClassName={styles.adsCarousel}
          scrollBarContainerClassName={styles.scrollbarContainer}
          scrollBarClassName={styles.scrollbar}
          swapWheelAxes
          smoothScrolling
          vertical={false}
          horizontal={true}
          scrollBarSize={939}
      >
        <Row className={styles.row}>
          <For each='product' of={products}>
            <div key={product.id} className={styles.col}>  
              <Product className={styles.product} product={product} />
            </div>
          </For>
        </Row>
      </ScrollArea>
    </Container>
    <div className={styles.swipe}>
      <div className={styles.swipe__inner}>
        <div className={styles.swipe__row}>
          <For each='product' of={products}>
            <div key={product.id} className={styles.swipe__col}>  
              <Product className={styles.swipe__product} product={product} />
            </div>
          </For>
        </div>
      </div>
    </div>
  </Section>
);

export default Ads;