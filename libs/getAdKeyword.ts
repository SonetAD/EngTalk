const getAdKeyword = (gender: string) => {
  if (gender === 'male') {
    return [
      'talk to real girls nearby',
      'make $500 a day from your phone',
      'secret dating app everyone’s using',
      'build muscle fast with this trick',
      'earn money while you sleep',
      'alpha male mindset secrets',
      'top 10 richest people secrets',
      'watch banned viral videos',
      'flirt with singles in your area',
      'unlock millionaire habits',
    ];
  } else {
    return [
      'exclusive designer deals just for you',
      'luxury handbags everyone is talking about',
      'get flawless skin with this secret serum',
      'shop the latest fashion trends now',
      'join the hottest girls’ luxury chat group',
      'must-have beauty products under $50',
      'unlock VIP access to premium shopping',
      'how to style like a fashion influencer',
      'glam up with these top makeup hacks',
      'find your new besties in your city',
    ];
  }
};

export default getAdKeyword;
