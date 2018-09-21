import React, { Component } from "react";
import "./CheckBox.css";
class CheckBox extends Component {
  render() {
    let { option, selected, action } = this.props;
    return (
      <div className="checkbox-wrapper">
        <input
          type="checkbox"
          checked={selected}
          value={option.value}
          onChange={action}
        />
        <label>{option.label}</label>
      </div>
    );
  }
}

export default CheckBox;
