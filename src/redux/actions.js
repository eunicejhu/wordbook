import {
  getCategoryAndHits,
  queryWithHelper,
  toggleFilter,
  clearFilters
} from "./api";
import {
  LAUNCH_SEARCH,
  RECEIVE_HITS,
  CHANGE_HITS_PER_PAGE,
  RECEIVE_INITIALIZE,
  TOGGLE_FILTER,
  CLEAR_FILTER,
  CHANGE_PAGE
} from "./actionTypes";
import { JANE_EYRE } from "./words";

const receiveHitsAction = payload => ({
  type: RECEIVE_HITS,
  ...payload
});

const receiveInitializeAction = payload => ({
  type: RECEIVE_INITIALIZE,
  ...payload
});

const queryAction = (dispatch, getState) => {
  const { filters, hitsPerPage, page, query } = getState().reducer;
  const searchParameters = { query, filters, hitsPerPage, page };
  queryWithHelper(searchParameters)
    .then(result => {
      const payload = {
        hits: result.hits,
        nbHits: result.nbHits,
        nbPages: result.nbPages,
        page: result.page,
        category: result.disjunctiveFacets.length
          ? result.disjunctiveFacets[0].data
          : []
      };
      dispatch(receiveHitsAction(payload));
    })
    .catch(error => {
      console.log({ error });
    });
};

export const InitializeAction = () => (dispatch, getState) => {
  const { hitsPerPage } = getState().reducer;
  getCategoryAndHits(hitsPerPage)
    .then(result => {
      const payload = {
        category: result.facets.category,
        hits: result.hits,
        nbPages: result.nbPages,
        page: result.page
      };
      dispatch(receiveInitializeAction(payload));
    })
    .catch(error => {
      console.log({ error });
    });
};

export const LaunchSearchAction = query => (dispatch, getState) => {
  dispatch({
    type: LAUNCH_SEARCH,
    query,
    page: 0
  });
  queryAction(dispatch, getState);
};

export const ChangeHitsPerPageAction = hitsPerPage => (dispatch, getState) => {
  dispatch({
    type: CHANGE_HITS_PER_PAGE,
    hitsPerPage
  });
  queryAction(dispatch, getState);
};

export const ToggleFilterAction = filter => dispatch => {
  toggleFilter(filter)
    .then(result => {
      const payload = {
        hits: result.hits,
        nbPages: result.nbPages,
        page: result.page,
        nbHits: result.nbHits
      };
      dispatch({
        type: TOGGLE_FILTER,
        ...payload
      });
    })
    .catch(e => {
      console.log({ e });
    });
};

export const ClearFiltersAction = () => dispatch => {
  clearFilters().then(result => {
    const payload = {
      hits: result.hits,
      nbPages: result.nbPages,
      page: result.page,
      nbHits: result.nbHits
    };
    dispatch({
      type: CLEAR_FILTER,
      ...payload
    });
  });
};

export const ChangePageAction = page => (dispatch, getState) => {
  dispatch({
    type: CHANGE_PAGE,
    page
  });
  queryAction(dispatch, getState);
};

export const InitializeWordBookAction = () => dispatch => {
  // read words from words.json

  dispatch({
    type: "FETCH_WORD_BOOK",
    words: JANE_EYRE
  });
};
