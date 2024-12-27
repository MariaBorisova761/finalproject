import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployVotingSystem: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    console.log("Deploying VotingSystem with deployer:", deployer);

    await deploy("VotingSystem", {
        from: deployer,
        log: true,
    });
};

export default deployVotingSystem;
deployVotingSystem.tags = ["VotingSystem"];
