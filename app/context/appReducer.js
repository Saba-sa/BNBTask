const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_PROVIDER":
      return { ...state, provider: action.payload };
    case "SET_SIGNER":
      return { ...state, signer: action.payload };
    case "SET_ACCOUNT":
      return { ...state, account: action.payload };
    case "SET_DEPLOYMENTTIMESTAMP":
      return { ...state, deploymentTimestamp: action.payload };
    case "READ_ONLY":
      return { ...state, readOnlyContract: action.payload };
       
    case "WRITE_ONLY":
      return { ...state, writeContract: action.payload };
       
      
      case "SET_BYWALLET":
      return { ...state, setContractWallet: action.payload };
    case "START_GAME":
      return { ...state, gameIsStarted: action.payload };
    case "SET_INITIALIZED":
      return { ...state, isInitialized: action.payload };
    case "SET_BALANCE":
      return { ...state, balance: action.payload };
    default:
      return state;
  }
};

export default appReducer;