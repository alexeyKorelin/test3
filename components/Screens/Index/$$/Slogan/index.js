import cx from 'classnames';
import {inject, observer} from 'mobx-react';
import styles from './index.sass';
import {phrases} from 'utils/phrases';
import {Container, Row, Col, Section} from 'components/Base/Grid';

const Slogan = ({className, ...props}) => (
  <Section className={cx(className, styles.root)}> 
    <Container>
      <p className={styles.inner} dangerouslySetInnerHTML={{__html: phrases.pages.index.slogan}} />
    </Container>
  </Section>
)

Slogan.displayName = 'Modules/Slogan';

export default Slogan;
