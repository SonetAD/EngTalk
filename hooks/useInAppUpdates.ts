import { useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import * as ExpoInAppUpdates from 'expo-in-app-updates';
import LocalStore from '@/libs/localStore';

const useInAppUpdates = () => {
  useEffect(() => {
    if (__DEV__ || Platform.OS === 'web') return;

    const checkForUpdates = async () => {
      try {
        const result = await ExpoInAppUpdates.checkForUpdate();
        if (!result.updateAvailable) return;

        const savedStoreVersion =  LocalStore.getString(
          'savedStoreVersion'
        );
        if (savedStoreVersion === result.storeVersion) return;

        if (Platform.OS === 'android') {
          try {
            await ExpoInAppUpdates.startUpdate(true);
             LocalStore.set(
              'savedStoreVersion',
              result.storeVersion
            );
          } catch (updateErr) {
            console.error('Failed to start update:', updateErr);
          }
          return;
        }

        Alert.alert(
          'Update available',
          'A new version of the app is available with many improvements and bug fixes. Would you like to update now?',
          [
            {
              text: 'Update',
              isPreferred: true,
              onPress: async () => {
                try {
                  await ExpoInAppUpdates.startUpdate(true);
                   LocalStore.set(
                    'savedStoreVersion',
                    result.storeVersion
                  );
                } catch (updateErr) {
                  console.error('Failed to start update:', updateErr);
                }
              },
            },
            {
              text: 'Cancel',
              onPress: async () => {
                try {
                   LocalStore.set(
                    'savedStoreVersion',
                    result.storeVersion
                  );
                } catch (storageErr) {
                  console.error('Failed to save version:', storageErr);
                }
              },
            },
          ]
        );
      } catch (err) {
        console.error('Update check failed:', err);
      }
    };

    checkForUpdates();
  }, []);
};

export default useInAppUpdates;