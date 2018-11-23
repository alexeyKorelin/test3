import {Component} from 'react';
import Category from 'components/Screens/Category';
import Head from 'next/head';
import { withRouter, Router } from 'next/router';
import {inject, observer} from 'mobx-react';

@inject('store')
@observer
class CategoryPage extends Component {

  static displayName = 'Pages/Category';

  render () {
    const slug = this.props.router.query.category;
    const category = this.props.store.findCategory(slug);

    return (
      <>
        <Head>
          <title>GetPallet | {category.title} </title>
        </Head>
        <Category category={category} />
      </>
    )
  }
}

export default withRouter(CategoryPage);
