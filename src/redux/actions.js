import { getCategoryAndHits, queryWithHelper, toggleFilter, clearFilters} from './api'
import {
  LAUNCH_SEARCH, RECEIVE_HITS, RECEIVE_HITS_ERROR, CHANGE_HITS_PER_PAGE, RECEIVE_INITIALIZE, TOGGLE_FILTER, CLEAR_FILTER, CHANGE_PAGE
} from './actionTypes'

const receiveHitsAction = (payload) => ({
  type: RECEIVE_HITS,
  ...payload
})

const receiveInitializeAction = (payload) => ({
  type: RECEIVE_INITIALIZE,
  ...payload
})

const queryAction = (dispatch, getState) => {
  let { filters, hitsPerPage, page, query } = getState().reducer
  let searchParameters = {query, filters, hitsPerPage, page}
  queryWithHelper(searchParameters).then(result => {
    let payload = {
      hits: result.hits,
      nbHits: result.nbHits,
      nbPages: result.nbPages,
      page: result.page,
      category: result.disjunctiveFacets.length ? result.disjunctiveFacets[0].data : []
    }
    dispatch(receiveHitsAction(payload))
  }).catch(error => {
    console.log({ error })
  })
}

export const InitializeAction = () => (dispatch, getState) => {
  let hitsPerPage = getState().reducer.hitsPerPage
  getCategoryAndHits(hitsPerPage).then(result => {
    let payload = { 
      category: result.facets.category, 
      hits: result.hits,
      nbPages: result.nbPages,
      page: result.page
    }
    dispatch(receiveInitializeAction(payload))
  }).catch(error => {
    console.log({ error })
  })
}

export const LaunchSearchAction = (query) => (dispatch, getState) => {
  dispatch({
    type: LAUNCH_SEARCH,
    query,
    page: 0
  })
  queryAction(dispatch, getState)
}

export const ChangeHitsPerPageAction = (hitsPerPage) => (dispatch, getState) => {
  dispatch({
    type: CHANGE_HITS_PER_PAGE,
    hitsPerPage: hitsPerPage
  })
  queryAction(dispatch, getState)
}

export const ToggleFilterAction = (filter) => (dispatch, getState) => {

  toggleFilter(filter).then(result => {
    let payload = {
      hits: result.hits,
      nbPages: result.nbPages,
      page: result.page,
      nbHits: result.nbHits
    }
    dispatch({
      type: TOGGLE_FILTER,
      ...payload
    })
  }).catch(e => {
    console.log({e})
  })
}

export const ClearFiltersAction = () =>(dispatch) => {
  clearFilters().then(result => {
    let payload = {
      hits: result.hits,
      nbPages: result.nbPages,
      page: result.page,
      nbHits: result.nbHits
    }
    dispatch({
      type: CLEAR_FILTER,
      ...payload
    })
  })
}

export const ChangePageAction = (page) => (dispatch, getState) => {
  dispatch({
    type: CHANGE_PAGE,
    page
  })
  queryAction(dispatch, getState)
}