import React, {Component} from 'react';
import cx from 'classnames';
import styles from './index.sass';
import {uniqueId} from 'lodash';
import FontIcon from 'components/Base/FontIcon';
import Toggle from 'components/Base/Toggle';

class Modal extends Component {
  _bodyClass = uniqueId('overflow-hidden_')

  render() {
    const { children, isOpen, className, onClose } = this.props
    
    return (
      <Toggle>
        <If condition={isOpen}>
          <div className={styles.root} >
            <div className={styles.overlay} onClick={this.onClose} />
            <div className={styles.table}>
              <div className={styles.cell}>
                <div className={cx(styles.popup, className)}>
                  <If condition={onClose}>
                    <button className={styles.close} onClick={this.onClose}>
                      <FontIcon className={styles.close__icon} i={'close'} />
                    </button>
                  </If>
                  {children}
                </div>
              </div>
            </div>
          </div>
        </If>
      </Toggle>
    );
  }

  componentDidMount() {
    const { isOpen } = this.props

    isOpen && this.bodyClassToggle(true)
    window.addEventListener('keydown', this.handleEscKeydown, false)
  }

  componentWillUnmount() {
    this.bodyClassToggle(false)
    window.removeEventListener('keydown', this.handleEscKeydown, false)
  }

  componentWillReceiveProps(nextProps) {
    (this.props.isOpen !== nextProps.isOpen) && this.bodyClassToggle(nextProps.isOpen)
  }

  onClose = () => {    
    const { onClose, isOpen } = this.props

    if (onClose && isOpen) {
      onClose()
      this.bodyClassToggle(false)
    }
  }

  bodyClassToggle = (isOpen) => {
    isOpen ? document.body.classList.add(this._bodyClass) : document.body.classList.remove(this._bodyClass)
  }

  handleEscKeydown = (e) => {  
    (e.keyCode === 27) && this.onClose()
  }
}

export default Modal;
