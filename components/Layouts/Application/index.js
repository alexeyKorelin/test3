import {Component} from 'react';
import Head from 'next/head';
import {Provider} from 'mobx-react';
import cx from 'classnames';
import 'styles/main.sass';
import styles from './index.sass';
import Settings from 'config';
import Raven from 'raven-js';
import Scripts from 'components/Base/Scripts';
import Header from 'components/Modules/Header';
import Footer from 'components/Modules/Footer';

class Application extends Component {
  isProd = process.env.NODE_ENV === 'production';

  constructor(props) {
    super(props);

    if (this.isProd) {
      Raven.config(Settings.sentry.react).install()
    }
  }

  componentDidCatch(err, errInfo) {
    if (this.isProd) {
      Raven.captureException(err, { extra: errInfo })
      super.componentDidCatch(err, errInfo)
    }
  }

  render () {
    const {children, router} = this.props;

    return (
      <div className={styles.root}>
        <Head>
          <title>Get Pallet</title>
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' key='viewport' />
          <link rel='apple-touch-icon' sizes='180x180' href={`${Settings.assetHost}/assets/fav/apple-touch-icon.png`} />
          <link rel='icon' type='image/png' sizes='32x32' href={`${Settings.assetHost}/assets/fav/favicon-32x32.png`} />
          <link rel='icon' type='image/png' sizes='16x16' href={`${Settings.assetHost}/assets/fav/favicon-16x16.png`} />
          <link rel='manifest' href={`${Settings.assetHost}/assets/fav/site.webmanifest`} />
          <link rel='mask-icon' href={`${Settings.assetHost}/assets/fav/safari-pinned-tab.svg`} color='#171717' />
          <meta name='msapplication-TileColor' content='#171717' />
          <meta name='theme-color' content='#171717' />          
          <script src={`https://maps.googleapis.com/maps/api/js?key=${Settings.googleApiKey}&libraries=places&language=ru`}></script>
        </Head>
        <If condition={this.isProd}>
          <Scripts />
        </If>
        <Header />
        <main className={cx(styles.main, {[styles.main_isMain]: router.route == '/'})}>{children}</main>
        <Footer className={styles.footer} />
      </div>
    )
  }
}

export default Application;
