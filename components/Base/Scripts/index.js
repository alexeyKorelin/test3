import React, {Component} from 'react';
import {YMInitializer} from 'react-yandex-metrika';
import Settings from 'config';

export default class Scripts extends Component {
  render () {
    const stage = Settings.stage;
    return (
      <>
        <If condition={stage == 'production'}>
          <YMInitializer accounts={[777]} version='2'
            options={{
              id: 777,
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true,
              webvisor: true
            }}/>
        </If>
        <script src="https://cdn.ravenjs.com/3.24.0/raven.min.js" crossOrigin="anonymous"></script>
      </>
    )
  }
}
