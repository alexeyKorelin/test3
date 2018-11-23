import {Component} from 'react';
import cx from 'classnames';
import {inject, observer} from 'mobx-react';
import styles from './index.sass';
import Categories from 'components/Modules/Categories';
import Questions from 'components/Modules/Questions';
import Rubrics from 'components/Modules/Rubrics';
import * as S from './$$';

@inject('store')
@observer
class Index extends Component {
  render() {
    const {ui} = this.props.store;
    
    return (
      <>
        <S.Main className={styles.main} />
        <S.Slogan className={styles.slogan} />
        <Rubrics className={styles.rubrics} />
        <Questions className={styles.questions} active={ui.pages.home.questions.active} toggle={ui.pages.home.questions.toggle} />
      </>
    )
  }
}

Index.displayName = 'Screens/Index';

export default Index;
