const initialState = {
  data: [],
  fetching: false,
  fetched: false,
  error: null,
}
export default function billReducer (state = initialState, action) {

  switch (action.type) {

    case 'FETCH_BILLS': {
      return {
        ...state,
        fetching: true,
        error: null
      }
    }

    case 'FETCH_BILLS_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        data: action.payload
      }
    }

    case 'FETCH_BILLS_REJECTED': {
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    }

    case 'ADD_BILL': {
      return {
        ...state,
        data: state.data.concat(action.payload)
      }
    }

  }

  return state;

}
