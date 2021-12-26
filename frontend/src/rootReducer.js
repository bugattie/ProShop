import { combineReducers } from "redux";

import {
  productListReducer,
  productDetailReducer,
} from "./reducers/productReducer.js";

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
});

export default rootReducer;
