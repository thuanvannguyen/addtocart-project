Dự án này sử dụng cấu trúc thư mục dựa trên tính năng cho `Redux`, giúp quản lý và mở rộng dễ dàng hơn. Dưới đây là mô tả chi tiết về cấu trúc thư mục của `Redux` trong dự án.

> Cấu trúc thư mục `"feature-based"` giúp quản lý mã nguồn rõ ràng và hiệu quả, đặc biệt là đối với các ứng dụng lớn và phức tạp. Cách tổ chức này không chỉ làm cho mã nguồn dễ dàng bảo trì mà còn tạo điều kiện thuận lợi cho việc mở rộng và phát triển tính năng mới.

## Redux directory structure

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
