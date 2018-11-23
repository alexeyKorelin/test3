import {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {Container, Row, Col} from 'components/Base/Grid';
import {observer, inject} from 'mobx-react';
import {withRouter} from 'next/router';
import Button from 'components/Base/Button';

@inject('store')
@observer
class Categories extends Component {
  render () {
    const {className, store, router} = this.props;
    const {categories} = store;
    
    return (
      <div className={cx(className, styles.root)}>
        <Container className={styles.inner}>
          <div className={styles.padding}>
            <ul className={styles.ul}>
              <For each='category' index='i' of={categories}>
                <li key={i} className={styles.li}>
                  <Button 
                    href={category.url} 
                    className={cx(
                      styles.a, 
                      {[styles.a_active]: router.query.category && router.query.category === category.slug}
                    )} 
                    kind='link' 
                    nounderline
                  >{category.title}</Button>
                </li>
              </For>
            </ul>
          </div>
        </Container>
      </div>
    )
  }
};

Categories.displayName = 'Modules/Categories';

export default withRouter(Categories);
