import {
  ADD,
  SUB
} from '../constants/cart'

export const add = () => {
  return {
    type: ADD
  }
};
export const minus = () => {
  return {
    type: SUB
  }
};

// 异步的action
// export function asyncAdd () {
//   return dispatch => {
//     setTimeout(() => {
//       dispatch(add())
//     }, 2000)
//   }
// }
