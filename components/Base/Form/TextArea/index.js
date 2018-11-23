import React, {Component} from 'react'
import cx from 'classnames'
import styles from './index.sass'
import TextAreaAutosize from 'react-textarea-autosize'

class TextArea extends Component {
  state = {
    error: false
  }

  handleChange = (e) => {
    const { value } = e.target;

    this.props.count && this.changeCount(value);
    this.props.onChange && this.props.onChange(e, value);
  }

  handleBlur = (e) => {
    const {value, onChange, onBlur} = this.props;

    onBlur && onBlur()
    onChange && onChange(e, value)
  }

  changeCount = (value) => {
    this.setState({
      count: value.length,
      error: value.length > this.props.count
    });
  }

  render() {
    const {
      minRows,
      maxRows,
      value,
      rows,
      onChange, // eslint-disable-line no-unused-vars
      onBlur, // eslint-disable-line no-unused-vars
      className,
      invalid,
      label,
      id,
      count,
      error,
      ...other
    } = this.props

    return (
      <div className={cx(styles.root, {[styles.error]: error})}>
        <If condition={label}>
          <label htmlFor={id}>{label}</label>
        </If>
        <If condition={count}>
          <span className={styles.count}>{value ? value.length : '0'}/{count}</span>
        </If>
        <TextAreaAutosize
          {...other}
          id={id}
          value={value}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          minRows={minRows || rows}
          maxRows={maxRows || rows || minRows}
          className={cx(styles.input, {[styles.invalid]: invalid}, className)}
        />
      </div>
    )
  }
}

export default TextArea
