const IsItALink = (text: string) => {
  const trimmed = text.trim();

  const urlRegex =
    /^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})(?:[\/\w\-?=%.#&+]*)?$/i;
  const phoneRegex =
    /^(\+?\d{1,4}[\s-]?)?(\(?\d{3,4}\)?[\s-]?)?\d{3,4}[\s-]?\d{3,4}$/;

  return urlRegex.test(trimmed) || phoneRegex.test(trimmed);
};

export default IsItALink;
