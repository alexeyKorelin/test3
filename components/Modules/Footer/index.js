import {Component} from 'react';
import cx from 'classnames';
import {inject, observer} from 'mobx-react';
import styles from './index.sass';
import Settings from 'config';
import {Link} from 'routes';
import {phrases} from 'utils/phrases';
import {Container, Row, Col, Section} from 'components/Base/Grid';
import Button from 'components/Base/Button';
import FeedbackModal from 'components/Modules/FeedbackModal';
import Payments from 'components/Modules/Payments';

@inject('store')
@observer
class Footer extends Component {
  render() {
    const { className } = this.props;
    const { feedback } = this.props.store;

    return (
      <footer className={cx(className, styles.root)}>
        <Section className={styles.footer}>
          <Container className={styles.inner}>
            <Row>
              <Col md='4' className={styles.col1}>
                <img className={styles.logo} src={`${Settings.assetHost}/assets/logo-wh.svg`} alt={phrases.site.name} title={phrases.site.name} />
                <Payments className={styles.payments} />
                <div className={styles.col1__col1}>  
                  <a className={styles.instagram} href={phrases.instagram.href} target='_blank'>{phrases.instagram.title}</a>
                </div>
                <div className={styles.col1__col2}>
                  <span className={styles.copyright}>{phrases.copyright}</span>
                </div>
              </Col>
              <Col xs='2' xsOffset='1' className={styles.list}>
                <div className={styles.list__header}>{phrases.footer.shop}</div>
                <ul className={styles.list__ul}>
                  <li className={styles.list__li}>
                    <Link route='/'>
                      <a className={styles.list__a}>{phrases.pages.index.title}</a>
                    </Link>
                  </li>
                  <li className={styles.list__li}>
                    <Link route='/catalog'>
                      <a className={styles.list__a}>{phrases.pages.catalog.title}</a>
                    </Link>
                  </li>
                  <li className={styles.list__li}>
                    <Link route='/'>
                      <a className={styles.list__a}>{phrases.pages.why_me.title}</a>
                    </Link>
                  </li>
                </ul>
              </Col>
              <Col xs='1' className={styles.list}>
                <div className={styles.list__header}>{phrases.footer.faq}</div>
                <ul className={styles.list__ul}>
                  <li className={styles.list__li}>
                    <Link route='/'>
                      <a className={styles.list__a}>{phrases.pages.payment.title}</a>
                    </Link>
                  </li>
                  <li className={styles.list__li}>
                    <Link route='/'>
                      <a className={styles.list__a}>{phrases.pages.delivery.title}</a>
                    </Link>
                  </li>
                </ul>
              </Col>
              <Col md='4' className={styles.col4}>
                <div className={styles.col4__call}>
                  <a className={styles.phone} href={`tel:${phrases.site.phone}`}>{phrases.site.phone}</a><br />
                  <Button onClick={() => feedback.toggle()} className={styles.call} color='white' reverse>{phrases.footer.call}</Button>
                  <FeedbackModal />
                </div>
                <div className={styles.col4__info}>
                  <span className={styles.address}>{phrases.site.address}</span>
                </div>
              </Col>
            </Row>
          </Container>
        </Section>
      </footer>
    )
  }
}

Footer.displayName = 'Modules/Footer';

export default Footer;
