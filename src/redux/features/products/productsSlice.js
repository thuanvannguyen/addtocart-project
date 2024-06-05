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
    name: "products",          // Tên của slice
    initialState,              // Trạng thái ban đầu
    reducers: {},              // Không có reducer đồng bộ nào được định nghĩa
    extraReducers: (builder) => {
        // Khi yêu cầu đang được xử lý
        builder.addCase(getProducts.pending, (state, action) => {
            state.loading = true; // Đặt trạng thái loading thành true
        })
        // Khi yêu cầu thành công
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.loading = false;     // Đặt trạng thái loading thành false
            state.value = action.payload; // Cập nhật dữ liệu sản phẩm vào state
        })
        // Khi yêu cầu thất bại
        builder.addCase(getProducts.rejected, (state, action) => {
            state.error = "Bad fetching!"; // Đặt thông báo lỗi
        })
    }
});

export default productsSlice.reducer; // Xuất reducer để sử dụng trong store của Redux
