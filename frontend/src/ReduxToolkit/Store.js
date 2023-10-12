import {configureStore} from "@reduxjs/toolkit"
import UserSlice from "./Slices/UserSlice"
import ProductSlice from "./Slices/ProductSlice"

const store = configureStore({
    reducer: {
        user: UserSlice,
        products: ProductSlice
    }
})

export default store