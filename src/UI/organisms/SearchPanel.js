import React, {Component} from 'react'
import Input from '../molecules/Input'
import Slider from '../atoms/Slider'
import Filter from '../molecules/Filter'
import Pagination from '../atoms/Pagination'

import './SearchPanel.css'
import PropTypes from 'prop-types'

class SearchPanel extends Component {
  render() {
    let { launchSearchAction, changeHitsPerPageAction, options, toggleFilterAction, clearFiltersAction, nbPages, page, changePageAction, nbHits, query, words } = this.props
    
    return (
      <div className="search-panel">
        {/* <Filter
          options={options}
          toggleFilter={toggleFilterAction}
          clearFilters={clearFiltersAction}
        /> */}
        {/* <Input action={launchSearchAction} count={nbHits} query={query} />
        <Slider action={changeHitsPerPageAction}
          nbPages={nbPages} />
        <div>
          {nbPages>1 && <Pagination 
            pages={nbPages} 
            current={page}
            action={changePageAction} />}
        </div> */}
        {/* {query && <div className="count">{`${nbHits} results found`}</div>} */}
        <div className="count">{`${words.length} results found`}</div>
      </div>
    )
  }
}

// SearchPanel.propTypes = {
//   launchSearchAction: PropTypes.function,
//   changeHitsPerPageAction: PropTypes.function,
//   selectCategoryAction: PropTypes.function,
//   changePageAction: PropTypes.function,
//   options: PropTypes.array,
//   nbPages: PropTypes.number,
//   page: PropTypes.number
// }

export default SearchPanel