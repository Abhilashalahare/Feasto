import { createSlice, current } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
  userData: null,
    currentCity: null,
    currentState: null,
    currentAddress: null,
    shopInMyCity: null,
    itemsInMyCity: null,
    cartItems: [{
      id: null,
      name: null,
      price: null,
      image: null,
      shop: null,
      quantity: null,
      foodType: null
    }],
   
  },
  reducers: {
       setUserData: (state, action) => {
      state.userData = action.payload
    },
    setCurrentCity: (state, action) => {
      state.currentCity = action.payload
    },
    setCurrentState: (state, action) => {
      state.currentState = action.payload
    },
    setCurrentAddress: (state, action) => {
      state.currentAddress = action.payload
    },
    setShopsInMyCity: (state, action) => {
      state.shopInMyCity = action.payload
    },
    setItemsInMyCity: (state, action) => {
      state.itemsInMyCity = action.payload
    },
    addToCart: (state, action) => {
      const cartItem = action.payload
      const existingItem = state.cartItems.find(i => i.id == cartItem.id)
      if (existingItem) {
        existingItem.quantity += cartItem.quantity
      } else {
        state.cartItems.push(cartItem)
      }

      state.totalAmount = state.cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)

    },

      setTotalAmount: (state, action) => {
      state.totalAmount = action.payload
    }

    ,

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.cartItems.find(i => i.id == id)
      if (item) {
        item.quantity = quantity
      }
      state.totalAmount = state.cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
    },

    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(i => i.id !== action.payload)
      state.totalAmount = state.cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
    },

  

  }
})

export const { setUserData, setCurrentAddress, setCurrentCity, setCurrentState, setShopsInMyCity, setItemsInMyCity, addToCart, setTotalAmount, updateQuantity, removeCartItem} = userSlice.actions
export default userSlice.reducer