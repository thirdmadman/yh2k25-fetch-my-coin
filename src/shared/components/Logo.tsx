import { APP_NAME } from '@/constants';

interface ILogoProps {
  text?: string;
}

export function Logo(props: ILogoProps) {
  let text = APP_NAME;

  if (props.text) {
    text = props.text;
  }

  return <h1>{text}</h1>;
}
