import {Component} from 'react';
import Product from 'components/Screens/Product';
import Head from 'next/head';

class ProductItemPage extends Component {

  static displayName = 'Pages/Product';

  render () {
    return (
      <>
        <Head>
          <title>Palette</title>
        </Head>
        <Product />
      </>
    )
  }
}

export default ProductItemPage;
