import React, { Component } from "react";
import { debounce } from "debounce";
import "./Slider.css";
import PropTypes from "prop-types";

const DEFAULT_SLIDER_VALUE = 20;
class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || DEFAULT_SLIDER_VALUE
    };
  }

  componentDidMount() {
    this.handleChangeDebounced = debounce(() => {
      let { action } = this.props;
      let { value } = this.state;
      action(value);
    }, 500);
  }

  onChangeHandler = e => {
    this.setState({
      value: e.target.value
    });
    this.handleChangeDebounced();
  };

  render() {
    let { value } = this.state;
    let { nbPages } = this.props;
    return (
      <div className="slider">
        <label className="range-label">
          Apps count Per page / <span className="count"> {nbPages}</span> pages
        </label>
        <input
          ref={node => (this._input = node)}
          className="range normal-range primary-range attached-range"
          type="range"
          min="10"
          max="100"
          step="1"
          value={value}
          onChange={this.onChangeHandler}
        />
        <span className="range-value">{value}</span>
      </div>
    );
  }
}
Slider.propTypes = {
  // action: PropTypes.function
};

export default Slider;
