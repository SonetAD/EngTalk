import * as Linking from 'expo-linking';

const openLink = (link: string) => {
  Linking.openURL(link).catch(() => console.log('Unable to open link'));
};

export default openLink;
