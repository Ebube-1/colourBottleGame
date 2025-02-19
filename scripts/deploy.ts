import { ethers } from "hardhat";

// async function main() {
//     const ColorBottleGame = await ethers.getContractFactory("ColorBottleGame");
//     const game = await ColorBottleGame.deploy();
//     await game.deployed();

//     console.log(`✅ ColorBottleGame deployed at: ${game.address}`);
// }

// main().catch((error) => {
//     console.error(error);
//     process.exit(1);
// });

const hre = require("hardhat");

async function main() {
    const ColorBottleGame = await hre.ethers.getContractFactory("ColorBottleGame");
    const game = await ColorBottleGame.deploy();

    await game.deployed();
    console.log(`✅ ColorBottleGame deployed to: ${game.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});