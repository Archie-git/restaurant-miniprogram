import { ADD, SUB } from '../constants/cart'

const INITIAL_STATE = {
  commodity: [
    {id: 0, count: 0}
  ]
};

export default function updateCart (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        count: state.count + 1
      };
     case SUB:
       return {
         ...state,
         count: state.count - 1
       };
     default:
       return state
  }
}
