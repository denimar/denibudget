const initialState = {
  data: [],
  fetching: false,
  fetched: false,
  error: null,
}
export default function budgetReducer (state = initialState, action) {

  switch (action.type) {

    case 'FETCH_BUDGETS': {
      return {
        ...state,
        fetching: true,
        error: null
      }
    }

    case 'FETCH_BUDGETS_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        data: action.payload
      }
    }

    case 'FETCH_BUDGETS_REJECTED': {
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    }

    case 'ADD_BUDGET': {
      return {
        ...state,
        data: state.data.concat(action.payload)
      }
    }

  }

  return state;

}
