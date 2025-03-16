interface ILogoProps {
  text: string;
}

export function Logo(props: ILogoProps) {
  const text = props.text;
  return <h1>{text}</h1>;
}
