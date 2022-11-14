module.exports = async function ({ ethers, deployments, getNamedAccounts }) {
  const { deploy } = deployments

  const { deployer, dev } = await getNamedAccounts()

  console.log("address :", deployer, dev)

  const { address } = await deploy("ChainLinkVRFDemo", {
    from: deployer,
    args: ["6181"],
    log: true,
    deterministicDeployment: false
  })

  console.log("ChainLinkVRFDemo address", address)

}

module.exports.tags = ["ChainLinkVRFDemo"]
