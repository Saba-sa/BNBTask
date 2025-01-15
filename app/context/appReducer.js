const appReducer = (state, action) => {
    switch (action.type) {
      case 'SET_PROVIDER':
        return { ...state, provider: action.payload };
      case 'SET_SIGNER':
        return { ...state, signer: action.payload };
      case 'SET_ACCOUNT':
        return { ...state, account: action.payload };
        case 'SET_DEPLOYMENTTIMESTAMP':
          return { ...state, deploymentTimestamp: action.payload };
          case 'SET_CONTRACT':
        return { ...state, contract: action.payload };
          
          case 'START_GAME':
            return { ...state, gameIsStarted: action.payload };   
               case 'SET_BALANCE':
        return { ...state, balance: action.payload };
      default:
        return state;
    }
  };
  
  export default appReducer;
  