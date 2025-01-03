//this store  will creatye one global reducer , it will hold all application state combine slices and create global reducer

import {configureStore } from'@reduxjs/toolkit'
import authReducer from './auth-slice'
import AdminProductsSlice from './admin/product-slice'
import shoppingProductSlice from './shop/products-slice'
import shopCartSlice from './shop/cart-slice'
import shopAddressSlice from './shop/address-slice'


const store = configureStore({
  reducer: {
      auth: authReducer,
      adminProducts: AdminProductsSlice,
      shopProducts: shoppingProductSlice,
      shopCart : shopCartSlice,
      shopAddress: shopAddressSlice

      
  }
})

export default store;

