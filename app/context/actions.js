export const setProvider = (provider) => ({
  type: "SET_PROVIDER",
  payload: provider,
});

export const setSigner = (signer) => ({
  type: "SET_SIGNER",
  payload: signer,
});

export const setAccount = (account) => ({
  type: "SET_ACCOUNT",
  payload: account,
});

export const setDeploymentTimestamp = (timestamp) => ({
  type: "SET_DEPLOYMENTTIMESTAMP",
  payload: timestamp,
});

export const readOnlyContract = (readOnlyContract) => ({
  type: "READ_ONLY",
  payload: readOnlyContract, // Updated to handle contracts object
});
export const writeContract = (writeContract) => ({
  type: "WRITE_ONLY",
  payload: writeContract, // Updated to handle contracts object
});

export const setBalance = (balance) => ({
  type: "SET_BALANCE",
  payload: balance,
});