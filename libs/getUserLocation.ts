import * as Location from 'expo-location';
import getCountryFlag from './getCountryFlag';

const getUserLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    return null;
  }
  let location = await Location.getLastKnownPositionAsync();
  if (!location) {
    location = await Location.getCurrentPositionAsync();
  }
  if (location) {
    const [{ country, isoCountryCode }] = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    const flag = getCountryFlag('IN');
    return `${flag} ${country}`;
  }

  return null;
};

export default getUserLocation;
