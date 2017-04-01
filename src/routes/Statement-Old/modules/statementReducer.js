const initialState = {
  data: [],
  fetching: false,
  fetched: false,
  error: null,
}
export default function statementReducer (state = initialState, action) {

  switch (action.type) {

    case 'ADD_STATEMENT': {
      return {
        ...state,
        data: action.payload
      }
    }

  }

  return state

}
