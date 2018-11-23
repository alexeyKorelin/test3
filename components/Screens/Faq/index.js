import {Component} from 'react';
import cx from 'classnames';
import {inject, observer} from 'mobx-react';
import Desktop from './Desktop';
import Mobile from './Mobile';

class Faq extends Component {
  render() {
    return (
      <>
        <Desktop />
        <Mobile />
      </>
    )
  }
}

Faq.displayName = 'Screens/Faq';

export default Faq;
