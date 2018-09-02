import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import SearchPanel from '../UI/organisms/SearchPanel'
import { LaunchSearchAction, ChangeHitsPerPageAction, InitializeAction, ToggleFilterAction, ClearFiltersAction, ChangePageAction, InitializeWordBookAction} from '../redux/actions'
class SearchPanelContainer extends Component {
  componentDidMount() {
    let { initializeWordBookAction} = this.props
    initializeWordBookAction()
  }

  render() {
    let { 
      launchSearchAction, changeHitsPerPageAction, category, toggleFilterAction, clearFiltersAction, hitsPerPage, query, nbPages, page, changePageAction, filters, nbHits, words} = this.props
    let options = !!category ? Object.keys(category).map(key => ({ value: `${key}`, label: `${key} ${category[key]}`})) : []
    let totalResultCount = query ? nbHits : false
    
    let childrenProps = {
      launchSearchAction,
      changeHitsPerPageAction,
      options,
      toggleFilterAction,
      clearFiltersAction,
      nbPages,
      page,
      nbHits: nbHits,
      query,
      changePageAction,
      words
    }
    return <SearchPanel {...childrenProps} />
  }
}

const mapStateToProps = state => ({...state.reducer})

const mapDispatchToProps = dispatch => ({
  launchSearchAction: bindActionCreators(LaunchSearchAction, dispatch),
  changeHitsPerPageAction: bindActionCreators(ChangeHitsPerPageAction, dispatch),
  initializeAction: bindActionCreators(InitializeAction, dispatch),
  toggleFilterAction: bindActionCreators(ToggleFilterAction, dispatch),
  clearFiltersAction: bindActionCreators(ClearFiltersAction, dispatch),
  changePageAction: bindActionCreators(ChangePageAction, dispatch),
  initializeWordBookAction: bindActionCreators(InitializeWordBookAction, dispatch),
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanelContainer)