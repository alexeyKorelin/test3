import cx from 'classnames';
import {inject, observer} from 'mobx-react';
import styles from './index.sass';
import Settings from 'config';
import {Link} from 'routes';
import {phrases} from 'utils/phrases';
import {Container, Row, Col, Section} from 'components/Base/Grid';
import Button from 'components/Base/Button';
import FontIcon from 'components/Base/FontIcon';

const Main = ({className, ...props}) => (
  <Section className={cx(className, styles.root)}>
    <Container className={styles.inner}>
      <Row>
        <Col md='5' className={styles.col1}>
          <div className={styles.info}>
            <h2 className={styles.title} dangerouslySetInnerHTML={{__html: phrases.pages.index.main.title}} />
            <p className={styles.description} dangerouslySetInnerHTML={{__html: phrases.pages.index.main.description}} />
          </div>
          <div className={styles.controls}>
            <Button href='/all' className={styles.catalog} kind='painted'>{phrases.pages.index.main.find}<FontIcon className={styles.next} i='next' /></Button>
            <br className={styles.controls__br} />
            <Button href='/faq' className={styles.more} kind='link'>{phrases.pages.index.main.more}</Button>
          </div>
        </Col>
      </Row>
    </Container>
  </Section>
)

Main.displayName = 'Modules/Main';

export default Main;
