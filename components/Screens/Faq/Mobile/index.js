import {Component} from 'react';
import cx from 'classnames';
import {inject, observer} from 'mobx-react';
import styles from './index.sass';
import {scrollTo} from 'utils/utils';
import {phrases} from 'utils/phrases';
import {Container, Row, Col} from 'components/Base/Grid';
import TextExpander from 'components/Base/TextExpander';

@inject('store')
@observer
class Mobile extends Component {
  state = {
    active: []
  }

  render() {    
    const {active} = this.state;
    const {className} = this.props;

    return (
      <Container className={cx(styles.root, className)}>
        <h1 className={styles.title}>{phrases.faq.title}</h1>
        <div className={styles.questions}>
          <For each='item' index='i' of={phrases.faq.questions}>
            <TextExpander 
              key={i} 
              className={styles.question}
              label={item.question} 
              description={item.answer} 
              isOpen={active.includes(i)} 
              onClick={() => this.toggle(i)} 
            />
          </For>
        </div>
      </Container>
    )
  }

  toggle = (i) => {
    let active = this.state.active.slice();
    (this.state.active.includes(i)) ? active.splice(active.indexOf(v => v == i), 1) : active.push(i);
    this.setState({active: active});
  }
}

Mobile.displayName = 'Screens/Faq/Mobile';

export default Mobile;
