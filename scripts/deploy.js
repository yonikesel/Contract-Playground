const { ethers } = require("ethers");
const { deployContract, GetErc20Balance } = require("./utils");
const RECTokenJSON = require("./../artifacts/RecToken.sol/RECToken.json");
require("dotenv").config();

const accountAddress = "0xe1aa8e08c4e89a5744eb32a654d50562341667bd";
const account0 = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );

  const accountSigner = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const account0Signer = await provider.getSigner(account0);

  await account0Signer.sendTransaction({
    to: accountAddress,
    value: ethers.utils.parseEther("10"),
  });

  const initialSupply = 1000000;
  const parsedInitialSupply = ethers.utils.parseEther(initialSupply.toString());

  const RECTokenContract = await deployContract(
    RECTokenJSON.abi,
    RECTokenJSON.bytecode.object,
    accountSigner,
    provider,
    parsedInitialSupply
  );
}

main();
