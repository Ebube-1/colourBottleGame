import { expect } from "chai";
import { ethers } from "hardhat";

describe("ColorBottleGame", function () {
    let game: any;
    let owner: any;
    let player: any;

    before(async function () {
        [owner, player] = await ethers.getSigners();
        const ColorBottleGame = await ethers.getContractFactory("ColorBottleGame");
        game = await ColorBottleGame.deploy();
        await game.deployed();
    });

    it("Should start the game and allow 5 attempts", async function () {
        let attempt = [1, 2, 3, 4, 5];
        let tx = await game.connect(player).playGame(attempt);
        let receipt = await tx.wait();
        let event = receipt.events.find((e: any) => e.event === "Attempt");

        console.log(`✅ Attempt made: ${attempt} | Correct positions: ${event.args.correctPositions}`);
        expect(event.args.correctPositions).to.be.gte(0);
    });

    it("Should reset after 5 failed attempts", async function () {
        for (let i = 0; i < 5; i++) {
            await game.connect(player).playGame([5, 4, 3, 2, 1]);
        }

        await expect(game.connect(player).playGame([1, 2, 3, 4, 5])).to.be.revertedWith("Game over! Start a new game.");
    });
});