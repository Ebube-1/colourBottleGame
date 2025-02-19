// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ColorBottleGame {
    uint256[5] private correctArrangement; // Stores the correct order of colors (1-5)
    uint256 private attempts; // Tracks attempts used
    bool private gameActive; // Ensures game resets after 5 attempts or win
    address public owner;

    event GameStarted(uint256[5] arrangement);
    event Attempt(uint256[5] attempt, uint256 correctPositions);
    event GameOver(bool won);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can shuffle bottles.");
        _;
    }

    constructor() {
        owner = msg.sender;
        _shuffleBottles();
    }

    function playGame(uint256[5] memory attempt) public returns (uint256 correctPositions) {
        require(gameActive, "Game over! Start a new game.");
        require(attempts < 5, "Max attempts reached! Bottles will be shuffled.");

        correctPositions = _checkArrangement(attempt);
        attempts++;

        emit Attempt(attempt, correctPositions);

        if (correctPositions == 5) {
            gameActive = false; // Stop further attempts
            emit GameOver(true);
        } else if (attempts == 5) {
            gameActive = false;
            emit GameOver(false);
            _shuffleBottles(); // Shuffle bottles after 5 attempts
        }

        return correctPositions;
    }

    function _shuffleBottles() private onlyOwner {
        require(!gameActive, "Game is still active.");

        uint256 seed = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, msg.sender)));
        uint256[5] memory shuffled = [uint256(1), 2, 3, 4, 5];

        for (uint256 i = 0; i < 5; i++) {
            uint256 j = seed % 5;
            (shuffled[i], shuffled[j]) = (shuffled[j], shuffled[i]); // Swap randomly
            seed = uint256(keccak256(abi.encodePacked(seed))); // Update randomness
        }

        correctArrangement = shuffled;
        attempts = 0;
        gameActive = true;

        emit GameStarted(correctArrangement);
    }

    function _checkArrangement(uint256[5] memory attempt) private view returns (uint256 correctPositions) {
        correctPositions = 0;
        for (uint256 i = 0; i < 5; i++) {
            if (attempt[i] == correctArrangement[i]) {
                correctPositions++;
            }
        }
    }

    function getCorrectArrangement() public view onlyOwner returns (uint256[5] memory) {
        return correctArrangement;
    }
}