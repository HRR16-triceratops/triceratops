import * as types from '../constants/ActionTypes';

export default (state = {
  items: [],
  filter: '',
  detail: {item: {}, disableDate: []}
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
        disableDate: action.payload.rentSchedule.map(schedule => {
          return schedule.date;
        })
      }
    };
    case types.RENT_FAILURE:
    return {
      ...state
    };
    case types.CANCEL_SUCCESS:
    return {
      ...state
    };
    case types.CANCEL_FAILURE:
    return {
      ...state
    };
    case types.REMOVELISTING_SUCCESS:
    let newItems = state.items.filter((item) => {
      return item._id !== action.itemId;
    });
    return {
      ...state,
      items: newItems
    }
    case types.ADDLISTING_SUCCESS:
    return {
      ...state,
      items: [
        ...state,
        action.newItem
      ]
    };
    default:
    return state;
  }
};
