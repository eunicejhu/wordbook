import React, { Component } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'debounce'
import SearchIcon from '../atoms/SearchIcon'
import ErasorIcon from '../atoms/EraserIcon'
import './Input.css'
import PropTypes from 'prop-types'

class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFocus: false,
    }
  }

  componentDidMount() {
    this.handleChangeDebounced = debounce(() => {
      let {action} = this.props
      action(this._input.value)
    }, 200)
  }

  onKeyPressHandler = (e) => {
    let {action} = this.props
    if (e.key === 'Enter') {
      action(e.target.value)
    }
  }

  onChangeHandler = (e) => {
    let {action} = this.props
    this.setState({value: e.target.value})
    this.handleChangeDebounced()
  }

  onClearHandler = (e) => {
    this.setState({ value: '' })
    this._input.value = ''
    this.handleChangeDebounced()
  }

  onClickHandler = () => {
    let { action } = this.props
    action(this._input.value)
  }

  onFocusHandler = () => {
    this.setState({
      isFocus: true
    })
  }

  onBlurHandler = () => {
    this.setState({
      isFocus: false
    })
  }

  render() {
    let { isFocus} = this.state
    let { count, query} = this.props
    
    return (
      <div>
        <div className="input-wrapper">
          <SearchIcon
            classes="search-icon"
            effect={isFocus}
            onClick={this.onClickHandler} />
          
          <input
            ref={node=>this._input = node}
            placeholder="Search apps from Apple Store "
            className="algolia-search"
            onKeyPress={this.onKeyPressHandler}
            onFocus={this.onFocusHandler}
            onBlur={this.onBlurHandler}
            onChange={this.onChangeHandler} />
          {query && <ErasorIcon classes="erasor-icon" action={this.onClearHandler} />}
          
        </div>
      </div>
     )
  }
}

Input.propTypes = {
  // action: PropTypes.function,
  nbHits: PropTypes.number
}

export default Input