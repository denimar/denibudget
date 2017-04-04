const initialState = {
  data: [],
  fetching: false,
  fetched: false,
  error: null,
}
export default function customerReducer (state = initialState, action) {

  switch (action.type) {

    case 'FETCH_CUSTOMERS': {
      return {
        ...state,
        fetching: true,
        error: null
      }
    }

    case 'FETCH_CUSTOMERS_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        data: action.payload
      }
    }

    case 'FETCH_CUSTOMERS_REJECTED': {
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    }

    case 'ADD_CUSTOMER': {
      return {
        ...state,
        data: state.data.concat(action.payload)
      }
    }

    case "UPDATE_CUSTOMER": {
      const id = action.payload.id;
      const newCustomers = [...state.data]
      const customerIndexToUpdate = newCustomers.findIndex(customer => customer.id === id)
      if (customerIndexToUpdate != -1) {
        newCustomers[customerIndexToUpdate] = Object.assign(newCustomers[customerIndexToUpdate], action.payload);
      }

      return {
        ...state,
        data: newCustomers,
      }
    }

    case "DELETE_CUSTOMER": {
      return {
        ...state,
        data: state.data.filter(customer => customer.id !== action.payload.id),
      }
    }

  }

  return state

}
