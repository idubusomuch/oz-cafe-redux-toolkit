import data from '../assets/data';
import { combineReducers, legacy_createStore } from 'redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

export const menuSlice = createSlice({
  name: 'menu',
  initialState: data.menu,
  reducers: {},
});

export const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart(state, action) {
      return [...state, action.payload];
    },
    removeFromCart(state, action) {
      // Cart.jsx에서 payload로 바로 id값을 보내고있기 때문에 payload.id가 아닌 그냥 payload로 비교
      return state.filter((el) => action.payload !== el.id);
    },
  },
});

export const store = configureStore({
  reducer: {
    menu: menuSlice.reducer,
    cart: cartSlice.reducer,
  },
});

// action
export const addToCart = (options, quantity, id) => {
  return {
    type: 'addToCart',
    payload: { options, quantity, id },
  };
};

export const removeFromCart = (id) => {
  return {
    type: 'removeFromCart',
    payload: { id },
  };
};
// Reducer
const cartReducer = (state = [], action) => {
  switch (action.type) {
    case 'addToCart':
      return [...state, action.payload];
    case 'removeFromCart':
      return state.filter((el) => action.payload !== el.id);
    default:
      return state;
  }
};

const menuReducer = (state = data.menu, action) => {
  return state;
};

const rootReducer = combineReducers({ cartReducer, menuReducer });

// store
// export const store = legacy_createStore(rootReducer);

/**/
