const initialState = {
  data: [],
  fetching: false,
  fetched: false,
  error: null,
}
export default function statementReducer (state = initialState, action) {

  switch (action.type) {

    case 'FETCH_ACCOUNTS': {
      return {
        ...state,
        fetching: true,
        error: null
      }
    }

    case 'FETCH_ACCOUNTS_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        data: action.payload
      }
    }

    case 'FETCH_ACCOUNTS_REJECTED': {
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    }

  }

  return state

}
