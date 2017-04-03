const initialState = {
  data: [],
  fetching: false,
  fetched: false,
  error: null,
}
export default function transactionReducer (state = initialState, action) {

  switch (action.type) {

    case 'FETCH_TRANSACTIONS': {
      return {
        ...state,
        fetching: true,
        error: null
      }
    }

    case 'FETCH_TRANSACTIONS_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        data: action.payload
      }
    }

    case 'FETCH_TRANSACTIONS_REJECTED': {
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    }

    case 'ADD_TRANSACTION': {
      return {
        ...state,
        data: state.data.concat(action.payload)
      }
    }

  }

  return state;

}
