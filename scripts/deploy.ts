import { ethers } from "hardhat";

async function main() {
    const ColorBottleGame = await ethers.getContractFactory("ColorBottleGame");
    const game = await ColorBottleGame.deploy();

    await game.waitForDeployment();

    console.log(`ColorBottleGame deployed at: ${await game.getAddress()}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});