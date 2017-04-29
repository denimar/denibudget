const initialState = {
  data: [],
  fetching: false,
  fetched: false,
  error: null,
}
export default function generalAccountBalanceReducer (state = initialState, action) {

  switch (action.type) {

    case 'FETCH_HOW_MUCH_MONEY_BUDGETS': {
      return {
        ...state,
        fetching: true,
        error: null
      }
    }

    case 'FETCH_HOW_MUCH_MONEY_BUDGETS_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        data: action.payload
      }
    }

    case 'FETCH_HOW_MUCH_MONEY_BUDGETS_REJECTED': {
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    }

  }

  return state

}
