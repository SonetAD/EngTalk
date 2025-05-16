import * as Linking from 'expo-linking';

const openLink = (rawLink: string) => {
  let link = rawLink.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phoneRegex = /^\+?\d[\d\s()-]{7,}$/;

  if (phoneRegex.test(link)) {
    // Open in dial pad
    link = `tel:${link.replace(/\s+/g, '')}`;
  } else if (emailRegex.test(link)) {
    // Open in email app
    link = `mailto:${link}`;
  } else if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(link)) {
    // If no protocol, treat it as a normal URL
    link = `https://${link}`;
  }

  Linking.openURL(link.toLowerCase()).catch(() =>
    console.log('Unable to open link')
  );
};

export default openLink;
