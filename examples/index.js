const ethers = require("ethers");

const INFURA_ID = "9bdd3aa48a5145cdb0f8f843faf25f3d";
const provider = new ethers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${INFURA_ID}`
);

const provider2 = new ethers.JsonRpcProvider(
  `https://ether-gateway.etherpay.dev/v1/mainnet`
);

const address = "0x73BCEb1Cd57C711feaC4224D062b0F6ff338501e";

const main = async () => {
  const balance = await provider2.getBalance(address);
  console.log(
    `\nETH Balance of ${address} --> ${ethers.formatEther(balance)} ETH\n`
  );
};

main();

const main2 = async () => {
  const blockNumber = await provider2.getBlockNumber();
  console.log("blockNumber :>> ", blockNumber);
};

main2();
