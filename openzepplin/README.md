# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

## Hardhat console script

1. Network에 접속
   `npx hardhat console --network mainnet`

2. Deploy
   InNFT를 바로 배포하지 말고 프록시 배포
   <br />

`INFT = await upgrades.deployProxy(InNFT, { kind: 'uups' })`

3. Mint(이 부분은 컨트랙트를 다시 손봐야 할 듯)
   `INFT.safeMint('EOA ADDRESS')`
