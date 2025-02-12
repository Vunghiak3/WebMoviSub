# 🎬 MoviSubs - Ứng Dụng Xem Phim Trực Tuyến

## 🏥 Giới Thiệu
**MoviSubs** là một ứng dụng xem phim trực tuyến, cung cấp nhiều thể loại phim và cập nhật liên tục những bộ phim mới nhất. Người dùng có thể tìm kiếm, xem phim, đánh giá và lưu phim yêu thích một cách dễ dàng.

## 🚀 Tính Năng Chính
- 🔍 **Tìm kiếm phim**: theo tên, thể loại.
- 🎭 **Danh mục phim đa dạng**: Phim hành động, kinh dị, hài hước, khoa học viễn tưởng, v.v.
- 🎞 **Xem phim chất lượng cao** với nhiều tùy chọn độ phân giải.
- ❤️ **Lưu phim yêu thích** để dễ dàng xem lại.
- 📝 **Đánh giá và bình luận phim**.
- 📜 **Xem thông tin chi tiết phim**: Đạo diễn, diễn viên, mô tả, trailer.
- 🔄 **Cập nhật phim mới liên tục**.
- 📱 **Hỗ trợ đa nền tảng**: Xem phim trên máy tính, điện thoại.

## 🛠 Công Nghệ Sử Dụng
- ⚛ **Next.js**: Hỗ trợ Server-Side Rendering (SSR) và tối ưu hóa SEO.
- 🗄 **MongoDB**: Lưu trữ dữ liệu phim, danh sách yêu thích, tài khoản người dùng.
- 🤖 **TypeScript**: Giúp code an toàn, dễ bảo trì.
- 🔗 **RESTful API**: Xây dựng API linh hoạt.
- 🎨 **Sass**: Thiết kế giao diện đẹp, dễ quản lý.
- 🛑 **JWT Authentication**: Bảo mật đăng nhập.

## 🔑 Cấu hình OAuth (GitHub & Google)
- Để sử dụng đăng nhập OAuth, cần đăng ký ứng dụng trên:
  - **GitHub**: [GitHub Developer Settings](https://github.com/settings/developers)
  - **Google**: [Google Cloud Console](https://console.cloud.google.com/)
- Sau khi đăng ký, lấy **Client ID** và **Client Secret**, rồi thêm vào `.env.local`.

## 📥 Cài Đặt & Sử Dụng
1. Clone repository:
   ```sh
   git clone https://github.com/Vunghiak3/WebMoviSub.git
2. Cài đặt dependencies:
   ```sh
   yarn install  
   hoặc
   npm install
3. Cấu hình môi trường:
   Tạo file .env.local và thêm các biến môi trường:
   ```sh
   PORT=1111
   GITHUB_ID=
   GITHUB_SECRET=
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   NEXTAUTH_SECRET=
   NEXTAUTH_URL=http://localhost:3000
   API_BASE_URL=https://ophim1.com/v1/api
   MongoURL="mongodb://localhost:27017/connection"
4. Chạy dự án
   ```sh
   yarn dev
   hoặc
   npm run dev
Ứng dụng sẽ chạy tại http://localhost:3000

## 🔌 API Endpoints (RESTful API)
   
## 🤝 Đóng Góp
Mọi đóng góp đều được hoan nghênh! Hãy fork repo, tạo issue hoặc gửi pull request để cải thiện ứng dụng.

## 📞 Liên Hệ
- 📧 Email: vunghiak3@gmail.com
- 🌐 GitHub: Vunghiak3

###
✨ **MoviSubs - Xem phim mọi lúc, mọi nơi!**