import {Component} from 'react';
import Cart from 'components/Screens/Cart';
import Head from 'next/head';
import {observer, inject} from 'mobx-react';
import {withRouter} from 'next/router';

@inject('store')
@observer
class OrderPage extends Component {

  static displayName = 'Pages/Order';

  componentDidMount () {
    this.fetchData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const {asPath} = nextProps.router;
    if (asPath != this.props.router.asPath) {
      this.fetchData(nextProps);
    }
  }

  fetchData(params) {
    const {order} = this.props.store;
    let uuid; try { uuid = this.props.router.query.order } catch (e) {};
    if (!uuid || (order && order.uuid == uuid)) return;
    order.fetch(uuid);
  }

  render () {
    const {order} = this.props.store;
    
    return (
      <>
        <Head>
          <title>Palette</title>
        </Head>
        <Cart order={order} />
      </>
    )
  }
}

export default withRouter(OrderPage);
