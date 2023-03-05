const AES = require("./aes-ctr");
const readline = require("readline");
const fs = require("fs");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
async function getInput() {
  // lấy thời gian khi bắt đầu chạy chương trình
  const start = Date.now();
  // lựa chọn đọc từ file hay từ bàn phím
  const options = await new Promise((resolve) => {
    rl.question(
      "Enter 1 to read plaintext from file \nEnter 2 to read plaintext from keyboard ",
      resolve
    );
  });
  if (options == 1) {
    // đọc file
    var plaintext = fs.readFileSync("plainText.txt", "utf8");
  } else if (options == 2) {
    // đọc từ bàn phím
    var plaintext = await new Promise((resolve) => {
      rl.question("Enter Plain Text ", resolve);
    });
  } else {
    // lựa chọn không hợp lệ
    console.log("Invalid Option");
    process.exit();
  }
  // nhập password
  const password = await new Promise((resolve) => {
    rl.question("Enter Key ", resolve);
  });
  // nhập độ dài khóa
  const keyLength = await new Promise((resolve) => {
    rl.question("Enter key leng 128/192/256 ", resolve);
  });
  // mã hóa
  const run = async () => {
    // gọi hàm mã hóa
    const cipher = await AES.encrypt(plaintext, password, keyLength);
    // lấy thời gian khi kết thúc chương trình
    const end = Date.now();
    // lưu kết quả vào file
    const result = {
      cipher,
      plaintext,
      password,
      keyLength,
      time: (end - start) / 1000 + "s",
    };

    fs.writeFile("encrypted.json", JSON.stringify(result), function (err) {
      if (err) throw err;
      console.log("Saved!");
    });
  };
  // chạy hàm mã hóa
  run();
  // đóng readline
  rl.close();
}
getInput();
