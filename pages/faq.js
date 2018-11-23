import {Component} from 'react';
import Faq from 'components/Screens/Faq';
import Head from 'next/head';
import {withRouter} from 'next/router';

class FaqPage extends Component {

  static displayName = 'Pages/Faq';
  
  render () {
    return (
      <>
        <Head>
          <title>Palette</title>
        </Head>
        <Faq />
      </>
    )
  }
}

export default withRouter(FaqPage);
