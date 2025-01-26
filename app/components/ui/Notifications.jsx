import React, { useEffect } from 'react';
import { useAppContext } from '@/app/context/AppContext';
import { toast } from 'react-toastify';

const Notifications = () => {
  const { state } = useAppContext();

  useEffect(() => {
    const checkEggs = async () => {
      const myEggs = await state.readOnlyContract.methods.getMyEggs().call({ from: state.account });
      if (myEggs >= 864000) { // EGGS_TO_HATCH_1MINERS = 864000
        toast.info('Your eggs are ready to hatch!');
      }
    };

    const interval = setInterval(checkEggs, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [state.readOnlyContract, state.account]);

  return null; // No UI, just notifications
};

export default Notifications;