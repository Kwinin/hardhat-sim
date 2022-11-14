const { task } = require("hardhat/config")
const { ethers: { constants: { MaxUint256 }}} = require("ethers")

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

task("PriceConsumerV3:getLatestPrice", "getLatestPrice")
  .setAction(async function ({}, { ethers: { getNamedSigner } }, runSuper) {
    const PriceConsumerV3 = await ethers.getContract("PriceConsumerV3")

    const ba = await PriceConsumerV3.getLatestPrice()
    console.log("ETH/USD: ", ethers.utils.formatUnits(ba, "gwei"))
  });

task("ChainLinkVRFDemo:requestRandomWords", "requestRandomWords")
  .setAction(async function ({}, { ethers: { getNamedSigner } }, runSuper) {
    const ChainLinkVRFDemo = await ethers.getContract("ChainLinkVRFDemo")

    await (await ChainLinkVRFDemo.connect(await getNamedSigner("dev")).requestRandomWords()).wait()
    console.log(111)
  });
