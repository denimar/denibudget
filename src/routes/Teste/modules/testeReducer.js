const initialState = {
  data: [],
  fetching: false,
  fetched: false,
  error: null,
}
export default function testeReducer (state = initialState, action) {

  switch (action.type) {

    case 'ADD_TESTE': {
      return {
        ...state,
        data: action.payload
      }
    }

  }

  return state

}
