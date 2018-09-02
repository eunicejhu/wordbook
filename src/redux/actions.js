import { getCategoryAndHits, queryWithHelper, toggleFilter, clearFilters} from './api'
import {
  LAUNCH_SEARCH, RECEIVE_HITS, RECEIVE_HITS_ERROR, CHANGE_HITS_PER_PAGE, RECEIVE_INITIALIZE, TOGGLE_FILTER, CLEAR_FILTER, CHANGE_PAGE,
  FETCH_WORD_BOOK
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


export const InitializeWordBookAction = () => dispatch  => {
  //read words from words.json
  let words = [
    { "id": 0, "word": "  ambivalence", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/ ambivalence" } },
    { "id": 1, "word": " scorn", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/scorn" } },
    { "id": 2, "word": " chubby", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/chubby" } },
    { "id": 3, "word": " imp", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/imp" } },
    { "id": 4, "word": " dimple", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/dimple" } },
    { "id": 5, "word": " mischievous", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/mischievous" } },
    { "id": 6, "word": " glint", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/glint" } },
    { "id": 7, "word": " gangling", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/gangling" } },
    { "id": 8, "word": " somber", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/somber" } },
    { "id": 9, "word": " withdraw", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/withdraw" } },
    { "id": 10, "word": " stricken", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/stricken" } },
    { "id": 11, "word": " polio", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/polio" } },
    { "id": 12, "word": " confined", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/confined" } },
    { "id": 13, "word": " exacerbated", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/exacerbated" } },
    { "id": 14, "word": " discrepancy", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/discrepancy" } },
    { "id": 15, "word": " confidante", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/confidante" } },
    { "id": 16, "word": " patio", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/patio" } },
    { "id": 17, "word": " cedar", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/cedar" } },
    { "id": 18, "word": " withered", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/withered" } },
    { "id": 19, "word": " peg", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/peg" } },
    { "id": 20, "word": " calf", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/calf" } },
    { "id": 21, "word": " bloomers", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/bloomers" } },
    { "id": 22, "word": " overcompensate", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/overcompensate" } },
    { "id": 23, "word": " tomboy", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/tomboy" } },
    { "id": 24, "word": " inscribed", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/inscribed" } },
    { "id": 25, "word": " curtailed", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/curtailed" } },
    { "id": 26, "word": " wound", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/wound" } },
    { "id": 27, "word": " nailed", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/nailed" } },
    { "id": 28, "word": " bows", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/bows" } },
    { "id": 29, "word": " emblems", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/emblems" } },
    { "id": 30, "word": " clutching", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/clutching" } },
    { "id": 31, "word": " Flanking", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/Flanking" } },
    { "id": 32, "word": " gesticulate", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/gesticulate" } },
    { "id": 33, "word": " fuses", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/fuses" } },
    { "id": 34, "word": " figurine", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/figurine" } },
    { "id": 35, "word": " grimacing", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/grimacing" } },
    { "id": 36, "word": " dandle", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/dandle" } },
    { "id": 37, "word": " bandit", "oxford_dic": { "link": "https://www.oxfordlearnersdictionaries.com/definition/english/bandit" } }

  ]
  
  dispatch({
    type: 'FETCH_WORD_BOOK',
    words
  })
}