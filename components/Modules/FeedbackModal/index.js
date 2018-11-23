import {Component} from 'react';
import cx from 'classnames';
import {inject, observer} from 'mobx-react';
import {phrases} from 'utils/phrases';
import styles from './index.sass';
import Modal from 'components/Base/Modal';
import TextInput from 'components/Base/Form/TextInput';
import TextArea from 'components/Base/Form/TextArea';
import Button from 'components/Base/Button';

@inject('store')
@observer
class FeedbackModal extends Component {
  state = {
    errors: null,
    success: false
  }

  onChange = (e) => {
    const { feedback } = this.props.store;
    const { name, value } = e.target;
    
    feedback.applyChanges({[name]: value});
  }

  submit = () => {
    const { feedback } = this.props.store;

    feedback.create()
      .then(res => {
        this.setState({success: true})
      })
      .catch(error => {
        this.setState({errors: error.errors})
      })
  }

  render() {
    const { feedback, ui } = this.props.store;
    const { errors, success } = this.state;
    const isOpen = feedback.opened || ui.action === 'feedback';

    return !success ? (
      <Modal className={styles.root} isOpen={isOpen} onClose={feedback.opened ? feedback.toggle : ui.closeModal}>
        <h3 className={styles.h3}>{feedback.title ? feedback.title : phrases.feedback.title}</h3>
        <TextInput 
          id='name' 
          name='name'
          label={phrases.feedback.name}
          value={feedback.name}
          onChange={this.onChange}
          error={errors && errors.name}
        />
        <TextInput 
          id='phone' 
          name='phone'
          label={phrases.feedback.phone}
          mask="+7 (999) 999-99-99"
          maskChar="_"
          value={feedback.phone}
          onChange={this.onChange}
          error={errors && errors.phone}
        />
        <TextArea
          id='comment' 
          name='comment'
          label={phrases.feedback.comment}
          value={feedback.comment}
          rows={4}
          onChange={this.onChange}
          error={errors && errors.comment}
        />
        <Button className={styles.button} color='white' onClick={this.submit}>{phrases.feedback.send}</Button>
      </Modal>
    ) : (
      <Modal className={styles.root} isOpen={isOpen} onClose={feedback.toggle}>
        <h3 className={styles.h3}>{feedback.title ? feedback.title : phrases.feedback.title}</h3>
        <p>{phrases.feedback.success}</p>
      </Modal>
    )
  }
}

FeedbackModal.displayName = 'Modules/Footer/FeedbackModal';

export default FeedbackModal;
