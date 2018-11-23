import {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {observer} from 'mobx-react';
import {phrases} from 'utils/phrases';
import {Container, Row, Col, Section} from 'components/Base/Grid';
import Button from 'components/Base/Button';
import TextExpander from 'components/Base/TextExpander';

const Questions = observer(({className, active, toggle}) => (
  <Section className={cx(className, styles.root)}>  
    <Container>
      <Row>
        <Col md='6'>
          <h2 className={styles.title}>{phrases.questions.title}</h2>
          <Button className={cx(styles.all, styles.all_md)} href='/faq' kind='link'>{phrases.questions.all}</Button>
        </Col>
        <Col md='6' className={styles.col2}>
          <For each='item' index='i' of={phrases.questions.items}>
            <TextExpander 
              key={i} 
              className={styles.question}
              label={item.question} 
              description={item.answer} 
              isOpen={active === i} 
              onClick={() => toggle(i)} 
            />
          </For>
          <Button className={cx(styles.all, styles.all_xs)} href='/faq' kind='link'>{phrases.questions.all}</Button>
        </Col>
      </Row>
    </Container>
  </Section>
));

Questions.displayName = 'Modules/Questions';

export default Questions;
