import { configureStore } from "@reduxjs/toolkit"; // Nhập hàm configureStore từ Redux Toolkit
import productsSlice from "../features/products/productsSlice"; // Nhập reducer từ productsSlice
import navbarSlice from './../features/navbar/navbarSlice'; // Nhập reducer từ navbarSlice
import detailsSlice from './../features/details/detailsSlice'; // Nhập reducer từ detailsSlice

// Tạo và cấu hình store Redux
export const store = configureStore({
    reducer: {
        productsReducer: productsSlice,  // Sử dụng productsSlice với tên productsReducer
        navbarReducer: navbarSlice,      // Sử dụng navbarSlice với tên navbarReducer
        detailsReducer: detailsSlice     // Sử dụng detailsSlice với tên detailsReducer
    }
});
