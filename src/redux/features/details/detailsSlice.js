import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Hàm lấy dữ liệu từ localStorage
function fetchFromLocalStorage() {
    let value = localStorage.getItem("details");
    if (value) {
        return JSON.parse(value); // Chuyển đổi chuỗi JSON thành đối tượng
    } else {
        return []; // Mảng trống nếu không có dữ liệu
    }
}

// Hàm lưu dữ liệu vào localStorage
function storeInLocalStorage(data) {
    localStorage.setItem("details", JSON.stringify(data)); // Chuyển đổi đối tượng thành chuỗi JSON
}

// Trạng thái ban đầu của slice
const initialState = {
    loading: false,           // Trạng thái tải dữ liệu
    value: fetchFromLocalStorage(), // Lấy dữ liệu chi tiết từ localStorage
    error: ""                 // Thông báo lỗi
}

// Tạo một action không đồng bộ để lấy dữ liệu chi tiết sản phẩm từ API
export const getDetails = createAsyncThunk("getDetails", async (id) => {
    const response = await axios.get(`https://dummyjson.com/products/${id}`); // Gửi yêu cầu GET đến API với id sản phẩm
    return response.data; // Trả về đối tượng sản phẩm từ phản hồi API
})

// Tạo slice để quản lý trạng thái chi tiết sản phẩm
export const detailsSlice = createSlice({
    name: "details",          // Tên của slice
    initialState,             // Trạng thái ban đầu
    reducers: {},             // Không có reducer đồng bộ nào được định nghĩa
    extraReducers: (builder) => {
        // Khi yêu cầu đang được xử lý
        builder.addCase(getDetails.pending, (state, action) => {
            state.loading = true; // Đặt trạng thái loading thành true
        })
        // Khi yêu cầu thành công
        builder.addCase(getDetails.fulfilled, (state, action) => {
            state.loading = false;       // Đặt trạng thái loading thành false
            state.value = action.payload; // Cập nhật dữ liệu chi tiết sản phẩm vào state
            storeInLocalStorage(state.value); // Lưu dữ liệu vào localStorage
        })
        // Khi yêu cầu thất bại
        builder.addCase(getDetails.rejected, (state, action) => {
            state.error = "Bad fetching!"; // Đặt thông báo lỗi
        })
    }
});

export default detailsSlice.reducer; // Xuất reducer của slice để sử dụng trong store của Redux
