interface Props {
  text: string;
  size?: number;
}

const trimLongString = ({ text, size = 15 }: Props): string => {
  if (text.length > size) {
    return text.slice(0, size) + '...';
  }
  return text;
};

export default trimLongString;
