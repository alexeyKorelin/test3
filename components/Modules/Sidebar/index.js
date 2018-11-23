import {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {uniqueId} from 'lodash';
import FontIcon from 'components/Base/FontIcon';

class Sidebar extends Component {
  _bodyClass = uniqueId('overflow-hidden_');

  componentDidMount() {
    const {isOpen} = this.props;

    isOpen && this.bodyClassToggle(true);
  }

  render () {
    const {className, isOpen, children, contentClassName} = this.props;

    return (  
      <div className={cx(styles.root, className, {[styles.root_open]: isOpen})}>
        <div className={styles.inner}>
          <div className={styles.top}>
            <button className={styles.close} onClick={this.onClose}>
              <FontIcon i='close' />
            </button>
          </div>
          <div className={cx(styles.content, contentClassName)}>{children}</div>
        </div>
      </div>
    )
  }

  componentWillReceiveProps(nextProps) {
    (this.props.isOpen !== nextProps.isOpen) && this.bodyClassToggle(nextProps.isOpen);
  }

  componentWillUnmount() {
    this.bodyClassToggle(false);
  }

  onClose = () => {    
    const {onClose, isOpen} = this.props;
    
    if (onClose && isOpen) {
      onClose();
      this.bodyClassToggle(false);
    }
  }

  bodyClassToggle = (isOpen) => isOpen ? 
    document.body.classList.add(this._bodyClass) : 
    document.body.classList.remove(this._bodyClass);

}

Sidebar.displayName = 'Modules/Sidebar';

export default Sidebar;
