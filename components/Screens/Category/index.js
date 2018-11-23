import {Component} from 'react';
import cx from 'classnames';
import {inject, observer} from 'mobx-react';
import styles from './index.sass';
import {Link} from 'routes';
import {Container} from 'components/Base/Grid';
import Products from 'components/Modules/Products';
import Questions from 'components/Modules/Questions';
import Categories from 'components/Modules/Categories';

@inject('store')
@observer
class Category extends Component {
  render() {
    const {category} = this.props;
    const {ui} = this.props.store;

    return (
      <>
        <Categories />
        <Products 
          className={styles.products} 
          products={category.pageProductItems} 
          toNextPage={category.toNextPage} 
          showMore={!category.productItemsShowed} 
        />
        <Questions className={styles.questions} active={ui.pages.category.questions.active} toggle={ui.pages.category.questions.toggle} />
      </>
    )
  }
}

Category.displayName = 'Screens/Category';

export default Category;
