const ethers = require("ethers");

async function deployContract(
  contractABI,
  contractByteCode,
  accountSigner,
  provider,
  ...params
) {
  const ContractFactory = new ethers.ContractFactory(
    contractABI,
    contractByteCode,
    accountSigner
  );
  const contract = await ContractFactory.deploy(...params);
  try {
    const result = await contract.deployTransaction.wait();
    console.log("deploy success");
  } catch (e) {
    console.log("deploy failed", e);
  }

  console.log("Deployed Contract at: " + contract.address);
  const deployedContract = new ethers.Contract(
    contract.address,
    contractABI,
    provider
  );
  const connectedDeployedContract = deployedContract.connect(accountSigner);

  return connectedDeployedContract;
}

async function GetErc20Balance(tokenContract, address) {
  const tokenDecimals = await tokenContract.decimals();
  const tokenBalance = await tokenContract.balanceOf(address);
  return Number.parseFloat(
    ethers.utils.formatUnits(tokenBalance, tokenDecimals)
  );
}

module.exports = {
  deployContract,
  GetErc20Balance,
};
