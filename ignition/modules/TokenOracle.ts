import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// Deploys SimplePriceOracle and MERT, then wires the token to the oracle.
// Defaults: owner = account[0], initialPrice = 100 (8 decimals => 100_00000000).
const TokenOracleModule = buildModule("TokenOracleModule", (m) => {
  const owner = m.getAccount(0);
  const initialPrice = m.getParameter("initialPrice", 100_00000000n);

  const oracle = m.contract("SimplePriceOracle", [owner, initialPrice]);
  const token = m.contract("MERT", [owner]);

  m.call(token, "setPriceOracle", [oracle]);

  return { oracle, token };
});

export default TokenOracleModule;