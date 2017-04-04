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

    case 'FETCH_BUDGET_DETAILS': {
      return {
        ...state,
        fetching: true,
        error: null
      }
    }

    case 'FETCH_BUDGET_DETAILS_FULFILLED': {
      const budgetId = action.budget.id;
      const newBudgets = [...state.data];
      const budgetIndex = newBudgets.findIndex(budget => budget.id === id)
      newBudgets[budgetIndex].details = action.payload;

      return {
        ...state,
        fetching: false,
        fetched: true,
        data: newBudgets
      }
    }

    case 'FETCH_BUDGET_DETAILS_REJECTED': {
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
