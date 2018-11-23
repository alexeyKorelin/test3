import {Component} from 'react';
import Index from 'components/Screens/Index';
import Head from 'next/head';
import {observer, inject} from 'mobx-react';

@inject('store')
@observer
class IndexPage extends Component {

  static displayName = 'Pages/Index';

  render () {
    const {store} = this.props;
    return (
      <>
        <Head>
          <title>Palette</title>
        </Head>
        <Index />
      </>
    )
  }
}

export default IndexPage;
