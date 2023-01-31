const shell = require("shelljs");

const compileString = "truffle compile";

// 테스트넷
const deployString = "truffle deploy --network polygonTestProxy --compile-none";

const init = async () => {
  try {
    console.log(" ---------------- 컴파일을 시작합니다. ---------------- ");
    await shell.exec(compileString);

    console.log(" ");
    console.log(" ---------------- 배포를 시작합니다. ---------------- ");
    await shell.exec(deployString);
  } catch (error) {
    console.log("-----------------------------------------------------");
    console.log("npm run deployProxy 재실행 해주세요.");
  }
};

init();
