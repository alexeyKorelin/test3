import {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {phrases} from 'utils/phrases';
import {Container, Row, Col} from 'components/Base/Grid';
import Rubric from 'components/Modules/Rubric';
import Button from 'components/Base/Button';
import FontIcon from 'components/Base/FontIcon';

const Rubrics = ({className, active, toggle}) => (
  <Container className={cx(className, styles.root)}>
    <h2 className={styles.title}>{phrases.pages.index.showcase.title}</h2>
    <Row className={styles.list}> 
      <For each='item' index='i' of={phrases.rubrics}>
        <Col className={styles.rubric} key={i} xs='12' sm='6' md='4'>
          <Rubric {...item} />
        </Col>
      </For>
    </Row>
    <div className={styles.controls}>
      <Button href='/all' kind='painted'>{phrases.pages.index.showcase.catalog}<FontIcon className={styles.next} i='next' /></Button>
    </div>
  </Container>
);

Rubrics.displayName = 'Modules/Rubrics';

export default Rubrics;
