const { ethers } = require("ethers");
const { deployContract, GetErc20Balance } = require("./utils");
const RECTokenJSON = require("./../artifacts/RecToken.sol/RECToken.json");
require("dotenv").config();

const accountAddress = "0xe1aa8e08c4e89a5744eb32a654d50562341667bd";
const account0 = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
const RECTokenAddress = "0x1c31111e2C0Ae814c703DF6D58e634c723187610";

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );

  const accountSigner = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const account0Signer = await provider.getSigner(account0);

  const RECTokenContract = new ethers.Contract(
    RECTokenAddress,
    RECTokenJSON.abi,
    accountSigner
  );

  let RECBalance = await GetErc20Balance(RECTokenContract, accountAddress);
  console.log("RECBalance :", RECBalance);

  await RECTokenContract.transfer(account0, ethers.utils.parseEther("500000"));

  RECBalance = await GetErc20Balance(RECTokenContract, accountAddress);
  console.log("RECBalance :", RECBalance);

  const mintAmount = 1000000;
  const parsedMintAmount = ethers.utils.parseEther(mintAmount.toString());

  await RECTokenContract.Mint(parsedMintAmount);

  RECBalance = await GetErc20Balance(RECTokenContract, accountAddress);
  console.log("RECBalance :", RECBalance);
}

main();
