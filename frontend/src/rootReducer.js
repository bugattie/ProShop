import { combineReducers } from "redux";

import {
  productListReducer,
  productDetailReducer,
} from "./reducers/productReducers.js";
import { cartReducer } from "./reducers/cartReducers";
import {
  userLoginReducer,
  userSignUpReducer,
  userDetailsReducer,
} from "./reducers/userReducers";

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userSignUpReducer,
  userDetails: userDetailsReducer,
});

export default rootReducer;
