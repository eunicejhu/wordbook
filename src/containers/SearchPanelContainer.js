import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators} from 'redux'
import SearchPanel from '../UI/organisms/SearchPanel'
import { LaunchSearchAction, ChangeHitsPerPageAction, InitializeAction, ToggleFilterAction, ClearFiltersAction, ChangePageAction} from '../redux/actions'
class SearchPanelContainer extends Component {
  componentDidMount() {
    let { initializeAction} = this.props
    initializeAction()
  }

  render() {
    let { 
      launchSearchAction, changeHitsPerPageAction, category, toggleFilterAction, clearFiltersAction, hitsPerPage, query, nbPages, page, changePageAction, filters, nbHits} = this.props
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
      changePageAction
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
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanelContainer)