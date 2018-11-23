import React from 'react';
import { Provider } from 'mobx-react';
import { getSnapshot } from 'mobx-state-tree';
import App, { Container } from 'next/app';
import { initStore } from '../stores';
import API from 'utils/api';
import Application from 'components/Layouts/Application';

async function getData () {
  return API.state.index().then(data => data.state);
}

export default class MyApp extends App {

  static async getInitialProps ({ Component, router, ctx }) {
    const isServer = (typeof window === 'undefined');
    const store = initStore(isServer, await getData());
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return {
      initialState: { 
        ...getSnapshot(store),
        ui: { action: router.query.action }
      },
      isServer,
      pageProps
    }
  }

  constructor (props) {
    super(props)
    this.store = initStore(props.isServer, props.initialState)
  }

  componentDidMount () {
    this.store.cart.init();
  }

  render () {
    const {Component, pageProps, router} = this.props;
    
    return (
      <Container>
        <Provider store={this.store}>
          <Application router={router}>
            <Component {...pageProps} />
          </Application>
        </Provider>
      </Container>
    )
  }
}
