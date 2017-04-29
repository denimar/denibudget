const initialState = {
  data: [],
  fetching: false,
  fetched: false,
  error: null,
}
export default function accountReducer (state = initialState, action) {

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

    case 'ADD_ACCOUNT': {
      return {
        ...state,
        data: state.data.concat(action.payload)
      }
    }

    case 'UPD_ACCOUNT': {
      let accountId = action.payload._id;
      let accountIndex = state.data.findIndex(account => account._id === accountId);
      state.data[accountIndex] = Object.assign(state.data[accountIndex], action.payload);

      return {
        ...state,
        data: Object.assign(state.data)
      }
    }

    case 'DEL_ACCOUNT': {
      return {
        ...state,
        data: state.data.filter(account => account._id !== action.payload._id),
      }
    }
  }

  return state

}
