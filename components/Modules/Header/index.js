import {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {withRouter} from 'next/router';
import Desktop from './Desktop';
import Mobile from './Mobile';

@inject('store')
@observer
class Header extends Component {
  render () {
    const {router} = this.props;

    return (
      <>
        <Desktop itemsCount={this.props.store.cart.itemsCount} router={router} />
        <Mobile itemsCount={this.props.store.cart.itemsCount} router={router} />
      </>
    )
  }
}

Header.displayName = 'Modules/Header';

export default withRouter(Header);
