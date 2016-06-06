import * as types from '../constants/ActionTypes';

/**
 *  Reducer related to Products
 */
export default (state = {
  items: [],        // State for every Products
  filter: '',       // State for Search Feature
  detail: {         // State for Single Product
    item: {},         // Item Detail
    disableDate: []   // Represent Occupied date
  }
}, action) => {
  switch (action.type) {
    case types.UPDATE_PRODUCTS_STATE:
    return {
      ...state,
      items: action.updatedProductsState
    }
    case types.UPDATE_PRODUCT_DETAIL:
    return {
      ...state,
      detail: {
        item: action.payload,

        // Extract Date information only
        disableDate: action.payload.rentSchedule.map(schedule => {
          return schedule.date;
        })
      }
    };
    case types.RENT_SUCCESS:
    return {
      ...state,
      detail: {
        item: action.payload,

        // Extract Date information only
        disableDate: action.payload.rentSchedule.map(schedule => {
          return schedule.date;
        })
      }
    };
    case types.CANCEL_SUCCESS:
    return {
      ...state,
      detail: {
        item: action.payload,

        // Extract Date information only
        disableDate: action.payload.rentSchedule.map(schedule => {
          return schedule.date;
        })
      }
    };
    case types.REMOVELISTING_SUCCESS:
    return {
      ...state,

      // Remove from items state
      items: state.items.filter((item) => {
        return item._id !== action.itemId;
      })
    }
    case types.ADDLISTING_SUCCESS:
    return {
      ...state,
      items: [
        ...state,
        action.newItem
      ]
    };
    case types.SEARCH:
    return {
      ...state,
      filter: action.payload
    };
    default:
    return state;
  }
};
