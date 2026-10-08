import Constants, { ExecutionEnvironment } from 'expo-constants';
import * as Updates from 'expo-updates';
import { useCallback } from 'react';

export const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

export function useAppUpdates() {
  const checkForUpdates = useCallback(async () => {
    try {
      if (!__DEV__ && !isExpoGo && Updates.isEnabled) {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
          return true;
        }
      }
    } catch (error) {
      console.warn('Error checking for updates:', error);
    }
    return false;
  }, []);

  return { checkForUpdates };
}
