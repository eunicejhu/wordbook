import React, { Component } from "react";
import Select from "react-select";

import "./MultiSelect.css";
// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ];

const customStyles = {
  option: (base, state) => ({
    ...base,
    backgroundColor: "#65a0a9",
    color: "white"
  }),
  placeholder: () => ({}),
  control: base => ({
    // none of react-selects styles are passed to <View />
    ...base,
    border: "2px solid white"
    // width: '12em',
  }),
  singleValue: (base, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...base, opacity, transition };
  }
};
class MultiSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: []
    };
  }

  // componentWillProps(nextProps) {
  //   let {options} = nextProps
  //   let { selectedOption} = this.state
  //   let optionsValues = options.map(option => option.value)
  //   let updatedSelectedOption = selectedOption.map(selectedOpt => {
  //     let index = optionsValues.indexOf(selectedOpt.value)
  //     return options[index]
  //   })
  //   console.log({ selectedOption})
  //   console.log({ updatedSelectedOption})
  //   this.setState({
  //     selectedOption: updatedSelectedOption
  //   })
  // }

  handleChange = selectedOption => {
    console.log("*******", { selectedOption });
    let { action } = this.props;
    this.setState(() => ({ selectedOption }));
    action(selectedOption);
  };
  render() {
    let { selectedOption } = this.state;
    let { options } = this.props;
    return (
      <Select
        style={{
          boxShadow: "none"
        }}
        isMulti
        isSearchable
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}
export default MultiSelect;
