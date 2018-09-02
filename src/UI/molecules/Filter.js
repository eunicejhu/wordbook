import React, {Component} from 'react'
import CheckBox from '../atoms/CheckBox'
import './Filter.css'
class Filter extends Component {
  constructor() {
    super()
    this.state = {
      selected: []
    }
  }
  onToggleFilterHandler = (index, value) => {
    let { toggleFilter} = this.props
    let {selected} = this.state
    var updatedSelected = selected.slice()
    if(selected.indexOf(value) == -1) {
      //add
      updatedSelected.push(value)
    } else {
      //remove
      updatedSelected.splice(index, 1)
    }
    this.setState({
      selected: updatedSelected
    })
    toggleFilter(value)
  }

  onClearFiltersHandler = () => {
    let { clearFilters } = this.props
    this.setState({
      selected: []
    })
    clearFilters()
  }
  
  render() {
    let { options, toggleFilter, clearFilters} = this.props
    let {selected} = this.state
    let renderOptions = options.map((option, index) => {
      let indexOfSelected = selected.indexOf(option.value)
      return (<CheckBox key={index} selected={indexOfSelected >= 0} option={option} action={this.onToggleFilterHandler.bind(this, indexOfSelected, option.value)} />)})
    return (
      <div className="filter-wrapper">
        <div className="label section">
          <label>Category / count</label>
         {selected.length > 0 &&  <button onClick={this.onClearFiltersHandler}>clear</button>}
        </div>
        <div className="filters section">
          {renderOptions}
        </div>
        
        
      </div>
    )
  }
}

export default Filter