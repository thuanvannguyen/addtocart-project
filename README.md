## Redux directory structure

Dự án này sử dụng cấu trúc thư mục dựa trên tính năng cho `Redux`, giúp quản lý và mở rộng dễ dàng hơn. Dưới đây là mô tả chi tiết về cấu trúc thư mục của `Redux` trong dự án.

> Cấu trúc thư mục `"feature-based"` giúp quản lý mã nguồn rõ ràng và hiệu quả, đặc biệt là đối với các ứng dụng lớn và phức tạp. Cách tổ chức này không chỉ làm cho mã nguồn dễ dàng bảo trì mà còn tạo điều kiện thuận lợi cho việc mở rộng và phát triển tính năng mới.


```plaintext
src
└───redux
    ├───📁 app
    │   └───store.js
    └───features
        ├───📁 details
        │   └───📄 detailsSlice.js
        ├───📁 navbar
        │   └───📄 navbarSlice.js
        └───📁 products
            └───📄 productsSlice.js

```
## createAsyncThunk

>Note: `createAsyncThunk` giúp giảm bớt boilerplate code cho việc xử lý các thao tác không đồng bộ và tích hợp dễ dàng với Redux Toolkit, đặc biệt là trong các tác vụ liên quan đến gọi API.


#### 1. Tạo một Async Thunk:
> - `createAsyncThunk` là một hàm trong Redux Toolkit cho phép tạo ra các action creators cho các thao tác không đồng bộ.
> - Nó giúp xử lý các tác vụ bất đồng bộ (ví dụ: gọi API) một cách dễ dàng và linh hoạt hơn.

```jsx
import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchUserData = createAsyncThunk(
  'userData/fetchData',
  async (userId, thunkAPI) => {
    // Gọi API hoặc thực hiện các tác vụ không đồng bộ khác ở đây
  }
);
```
#### 2. Cú pháp:
> Trong một slice Redux, bạn có thể sử dụng extraReducers để xử lý các trạng thái khác nhau của thao tác không đồng bộ.

```jsx
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    loading: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.loading = 'idle';
      state.data = action.payload;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.loading = 'idle';
      state.error = action.error.message;
    });
  },
});
```
#### 3. Sử dụng trong component
> - Trong component React, bạn có thể gọi dispatch(fetchUserData()) để bắt đầu một tác vụ không đồng bộ.
> - Sử dụng useSelector để lấy dữ liệu từ store Redux và hiển thị nó trên giao diện người dùng.

```jsx
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from './userSlice';

function UserProfile() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.data);
  const loading = useSelector((state) => state.user.loading);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  if (loading === 'pending') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {userData && (
        <div>
          <h1>{userData.name}</h1>
          <p>{userData.email}</p>
        </div>
      )}
    </div>
  );
}
```

#### 5. Cảm thấy cần hủy bỏ:
`createAsyncThunk` hỗ trợ hủy bỏ trước khi thực thi hoặc khi đang chạy tác vụ không đồng bộ.

```jsx
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Tạo một tác vụ không đồng bộ để lấy dữ liệu người dùng từ API
const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId: number, { signal }) => {
    // Trước khi gửi yêu cầu, kiểm tra xem có bị hủy bỏ không
    if (signal.aborted) {
      throw new Error('Request aborted')
    }
    
    // Gửi yêu cầu và lấy dữ liệu từ API
    const response = await fetch(`https://api.example.com/users/${userId}`, { signal })
    const data = await response.json()

    return data
  },
)

// Tạo slice để quản lý trạng thái người dùng
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Xử lý trạng thái khi tác vụ bắt đầu
    builder.addCase(fetchUserById.pending, (state, action) => {
      state.loading = true
      state.error = null
    })

    // Xử lý trạng thái khi tác vụ thành công
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.loading = false
      state.user = action.payload
    })

    // Xử lý trạng thái khi tác vụ thất bại
    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  },
})

// Khi bạn muốn gửi yêu cầu lấy dữ liệu người dùng
// dispatch(fetchUserById(userId))
```
##### Giải thích:

- Chúng ta sử dụng createAsyncThunk để tạo một tác vụ không đồng bộ fetchUserById, có thể lấy dữ liệu người dùng từ API.
- Trong tác vụ, chúng ta kiểm tra signal.aborted trước khi gửi yêu cầu. Nếu nó đã bị hủy bỏ, chúng ta ném một lỗi để dừng tác vụ.
- Trong slice của Redux, chúng ta xử lý các trạng thái khác nhau của tác vụ: pending (đang chờ), fulfilled (thành công) và rejected (thất bại).
- Khi gọi fetchUserById(userId), Redux sẽ tự động gọi và xử lý tác vụ, và cập nhật trạng thái Redux tương ứng.