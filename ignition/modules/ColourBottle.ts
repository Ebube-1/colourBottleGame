// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ColourBottle = buildModule("ColourBottle", (m) => {
  
  const simple = m.contract("ColourBottle");

  return { simple };
});

export default ColourBottle;