const fs = require('fs');
const path = require('path');

// Đường dẫn thư mục app của bạn
const dirPath = path.join(__dirname, 'src/app');
const routes = [];

// Kiểm tra nếu thư mục app tồn tại
if (fs.existsSync(dirPath)) {
  fs.readdirSync(dirPath).forEach((file) => {
    if (fs.lstatSync(path.join(dirPath, file)).isDirectory()) {
      routes.push({ route: `/${file}` });
    }
  });

  // Ghi kết quả vào file route.tsx
  const routeFilePath = path.join(__dirname, 'routes.tsx');

  // Tạo nội dung cho file route.tsx
  const fileContent = `
  const routes = ${JSON.stringify(routes, null, 2)};
  
  export default routes;
  `;

  // Ghi dữ liệu vào file route.tsx (sử dụng writeFileSync để ghi đè)
  fs.writeFileSync(routeFilePath, fileContent);

  console.log(`Routes have been saved to ${routeFilePath}`);
} else {
  console.log(`The directory ${dirPath} does not exist.`);
}
