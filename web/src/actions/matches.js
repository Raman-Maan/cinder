import * as types from './actionTypes';

export function errored(bool) {
  return {
    type: types.MATCHES_ERROR,
    error: bool
  };
}

export function loading(bool) {
  return {
    type: types.MATCHES_LOADING,
    loading: bool
  };
}

export function fetchSuccess(data) {
  return {
    type: types.MATCHES_FETCH_SUCCESS,
    matches: data
  };
}

export function matchesFetchData(uri) {
  return dispatch => {
    dispatch(loading(true));

    fetch(uri)
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        dispatch(loading(false));
        return res.json();
      })
      .then(data => dispatch(fetchSuccess(data)))
      .catch(() => dispatch(errored(true)));
  };
}
