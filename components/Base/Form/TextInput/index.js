import {Component} from 'react'
import cx from 'classnames'
import styles from './index.sass'
import InputMask from 'react-input-mask'
import Geosuggest from 'react-geosuggest'

class TextInput extends Component {
  blur = () => this.input && this.input.blur()
  focus = () => this.input && this.input.focus()

  render() {
    const {
      type = 'text',
      className, invalid,
      mask, maskChar = null,
      onSuggestSelect,
      label, id, error, 
      ...other
    } = this.props

    const Component = mask ? InputMask : onSuggestSelect ? Geosuggest : 'input'
    const maskProps = mask ? {mask, maskChar, alwaysShowMask: true} : null
    const suggestProps = onSuggestSelect ? {
      onSuggestSelect,
      initialValue: this.props.value,
      inputClassName: styles.input,
      suggestsClassName: styles.suggests,
      suggestsHiddenClassName: styles.suggests_hidden,
      suggestItemClassName: styles.suggestItem,
      suggestItemActiveClassName: styles.suggestItem_active
    } : null

    return (
      <div className={cx(styles.root, {[styles.error]: error})}>
        <If condition={label}>
          <label htmlFor={id}>{label}</label>
        </If>
        <Component
          type={type}
          ref={this.handleInputRef}
          className={cx(onSuggestSelect ? styles.suggest : styles.input, {[styles.invalid]: invalid}, className)}
          id={id}
          {...maskProps}
          {...suggestProps}
          {...other}
        />
      </div>
    )
  }

  handleInputRef = el => this.input = el
}

export default TextInput
