import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Trạng thái ban đầu của slice
const initialState = {
    loading: false,  // Trạng thái tải dữ liệu
    value: [],       // Mảng chứa dữ liệu sản phẩm
    error: ""        // Thông báo lỗi
}

// Tạo một action không đồng bộ để lấy dữ liệu sản phẩm từ API
export const getProducts = createAsyncThunk("getProducts", async () => {
    const response = await axios.get("https://dummyjson.com/products"); // Gửi yêu cầu GET đến API
    return response.data.products; // Trả về mảng sản phẩm từ phản hồi API
})

// Tạo slice để quản lý trạng thái sản phẩm
export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Khi yêu cầu đang được xử lý
        builder.addCase(getProducts.pending, (state, action) => {
            state.loading = true; // Đặt trạng thái loading thành true
        })
        // Khi yêu cầu thành công
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.value = action.payload;
        })
        // Khi yêu cầu thất bại
        builder.addCase(getProducts.rejected, (state, action) => {
            state.error = "Bad fetching!";
        })
    }
});

export default productsSlice.reducer; 
