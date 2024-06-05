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

#### 1. Tổng quát:
- createAsyncThunk là một hàm trong Redux Toolkit cho phép tạo ra các action creators cho các thao tác không đồng bộ.
- Nó giúp xử lý các tác vụ bất đồng bộ (ví dụ: gọi API) một cách dễ dàng và linh hoạt hơn.

#### 2. Cú pháp:

```jsx
const myAsyncThunk = createAsyncThunk(
  'sliceName/myAsyncThunk',
  async (arg, thunkAPI) => {
    // Code xử lý bất đồng bộ ở đây
  }
);
```

#### 3. Cách sử dụng:

`createAsyncThunk` nhận vào ba tham số:
- `typePrefix`: Chuỗi định danh cho các action types được tạo ra. Nó phải là một chuỗi duy nhất.
- `payloadCreator`: Một hàm xử lý bất đồng bộ trả về một promise hoặc một giá trị. Nó có thể chấp nhận các tham số truyền vào và một đối tượng `thunkAPI` chứa các phương thức và thuộc tính hữu ích.
- `options`: Một đối tượng tùy chọn có thể chứa các callback như `condition`, `dispatchConditionRejection`, `idGenerator`, `serializeError`, `getPendingMeta`.
Sau khi gọi `createAsyncThunk`, nó sẽ trả về một action creator được gọi là `myAsyncThunk`.