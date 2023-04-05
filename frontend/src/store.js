import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools}from 'redux-devtools-extension';
import {newProductReducer, newReviewReducer, productDetailsReducer, productsReducer,productReducer, productReviewsReducer, reviewReducer} from './reducers/productReducer';
import { allUserReducer, profileReducer, userDetailsReducer, userReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { OrderReducer, allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer } from './reducers/orderReducer';
const reducer=combineReducers({
products:productsReducer,
productDetails:productDetailsReducer,
user:userReducer,
profile:profileReducer,
cart:cartReducer,
newOrder:newOrderReducer,
myOrders:myOrdersReducer,
orderDetails:orderDetailsReducer,
newReview:newReviewReducer,
newProduct:newProductReducer,
product:productReducer,
allOrders:allOrdersReducer,
order:OrderReducer,
allUsers:allUserReducer,
userDetails:userDetailsReducer,
productReview:productReviewsReducer,
review:reviewReducer
});
let initialState={
    cart:{
        cartItems:localStorage.getItem('cartItems')?
        JSON.parse(localStorage.getItem("cartItems")):[],
        shippingInfo:localStorage.getItem("shippingInfo")?JSON.parse(localStorage.getItem("shippingInfo")):{},
    },
};
const middleware=[thunk];
const store=createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);
export default store;