import { createSlice } from '@reduxjs/toolkit';
import { toast } from "react-hot-toast";

// Hàm lấy dữ liệu từ localStorage
function fetchFromLocalStorage() {
    let value = localStorage.getItem("value");
    if (value) {
        return JSON.parse(value); // Chuyển đổi chuỗi JSON thành mảng
    }
    else {
        return []; // Mảng trống nếu không có dữ liệu
    }
}

// Hàm lưu dữ liệu vào localStorage
function storeInLocalStorage(data) {
    localStorage.setItem("value", JSON.stringify(data)); // Chuyển đổi mảng thành chuỗi JSON
}

// Trạng thái ban đầu của slice, lấy dữ liệu từ localStorage
const initialState = {
    value: fetchFromLocalStorage(),
}

// Tạo slice để quản lý trạng thái của navbar
export const navbarSlice = createSlice({
    name: "navbar",
    initialState,
    reducers: {
        // Thêm sản phẩm vào giỏ hàng
        add: (state, action) => {
            const existingProduct = state.value.find(eachProduct => eachProduct.id === action.payload.id);

            if (existingProduct) {
                existingProduct.quantity += 1; // Tăng số lượng nếu sản phẩm đã có trong giỏ
            }

            state.value = [...state.value, { ...action.payload, quantity: 1 }]; // Thêm sản phẩm mới với số lượng 1

            // Loại bỏ các sản phẩm trùng lặp, chỉ giữ lại một sản phẩm với id duy nhất
            const uniqueProducts = state.value.filter((product, index, self) =>
                index === self.findIndex(p => p.id === product.id)
            );

            state.value = uniqueProducts;
            storeInLocalStorage(state.value); // Lưu trạng thái mới vào localStorage
            toast.success("Product is added!"); // Hiển thị thông báo thành công
        },

        // Xóa sản phẩm khỏi giỏ hàng
        remove: (state, action) => {
            const index = state.value.findIndex(product => product.id === action.payload);

            if (index !== -1) { 
                state.value.splice(index, 1); 

                storeInLocalStorage(state.value); 
                toast.success("Product is removed!"); 
            }
        },

        // Giảm số lượng của một sản phẩm trong giỏ hàng
        removeOne: (state, action) => {
            const index = state.value.findIndex(product => product.id === action.payload);

            if (index !== -1) {
                if (state.value[index].quantity > 1) {
                    state.value[index].quantity -= 1; 

                    storeInLocalStorage(state.value); 
                    toast.success("Product is removed!"); 
                }
            }
        }
    },
});

// Xuất các hành động từ slice để sử dụng trong các component
export const { add, remove, removeOne } = navbarSlice.actions;

// Xuất reducer của slice để sử dụng trong store của Redux
export default navbarSlice.reducer;
