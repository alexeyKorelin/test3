import {Component} from 'react';
import Cart from 'components/Screens/Cart';
import Head from 'next/head';
import {observer, inject} from 'mobx-react';

@inject('store')
@observer
class CartPage extends Component {

  static displayName = 'Pages/Cart';

  render () {
    const {cart} = this.props.store;

    return (
      <>
        <Head>
          <title>Palette</title>
        </Head>
        <Cart cart={cart} />
      </>
    )
  }
}

export default CartPage;
