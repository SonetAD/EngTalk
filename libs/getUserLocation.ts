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
    const place = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    if (place && place.length > 0) {
      const [{ country, isoCountryCode }] = place;
      const flag = getCountryFlag(isoCountryCode);
      return `${flag} ${country}`;
    }
  }

  return null;
};

export default getUserLocation;
