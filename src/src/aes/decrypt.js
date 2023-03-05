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
  // nhập cipher
  let cipher = await new Promise((resolve) => {
    rl.question("Enter cipher ", resolve);
  });
  // nhập password
  const password = await new Promise((resolve) => {
    rl.question("Enter Password ", resolve);
  });
  // nhập độ dài khóa
  const keyLength = await new Promise((resolve) => {
    rl.question("Enter key length 128/192/256 ", resolve);
  });
  // giải mã
  const run = async () => {
    // gọi hàm giải mã
    const plaintext = await AES.decrypt(cipher, password, keyLength);
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
    fs.writeFile("decrypted.json", JSON.stringify(result), function (err) {
      if (err) throw err;
      console.log("Saved!");
    });
  };
  run();

  rl.close();
}
getInput();
