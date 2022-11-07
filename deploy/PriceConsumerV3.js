module.exports = async function ({ ethers, deployments, getNamedAccounts }) {
  const { deploy } = deployments

  const { deployer, dev } = await getNamedAccounts()

  console.log("address :", deployer, dev)

  const { address } = await deploy("PriceConsumerV3", {
    from: deployer,
    args: [],
    log: true,
    deterministicDeployment: false
  })

  console.log("PriceConsumerV3 address", address)

}

module.exports.tags = ["PriceConsumerV3"]
