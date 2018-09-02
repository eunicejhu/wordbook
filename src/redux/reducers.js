import { combineReducers } from 'redux';
import {
  LAUNCH_SEARCH, RECEIVE_HITS, RECEIVE_HITS_ERROR, CHANGE_HITS_PER_PAGE, RECEIVE_INITIALIZE, TOGGLE_FILTER, CLEAR_FILTER, CHANGE_PAGE,
  FETCH_WORD_BOOK
} from './actionTypes'
const initialState = {
  query: '',
  category: false,
  hits: [],
  hitsPerPage: 20,
  nbHits: false,
  nbPages: false,
  page: 0,
  filters: [],
  words: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LAUNCH_SEARCH:
      return Object.assign({}, state, { query: action.query, page: action.page});
    break
    case RECEIVE_HITS:
      return Object.assign({}, state, {
        hits:action.hits,
        nbHits: action.nbHits,
        nbPages: action.nbPages,
        page: action.page,
        category: action.category
      });
    break
    case RECEIVE_HITS_ERROR: 
      //TODO
      return state
      break
    case CHANGE_HITS_PER_PAGE:
      return Object.assign({}, state, {
        hitsPerPage: action.hitsPerPage
      });
    break
    case RECEIVE_INITIALIZE:
      return Object.assign({}, state, {
        category: action.category,
        hits: action.hits,
        nbPages: action.nbPages,
        page: action.page
      });
    break
    case TOGGLE_FILTER: 
    case CLEAR_FILTER:
      return Object.assign({}, state, {
        hits: action.hits,
        nbPages: action.nbPages,
        nbHits: action.nbHits,
        page: action.page
      })
    break
    case CHANGE_PAGE: 
      return Object.assign({}, state, { page: action.page })
    break

    case FETCH_WORD_BOOK:
      return Object.assign({}, state, {words: action.words})
    break
    default:
      return state
  }
}

export default combineReducers({
  reducer
}) 