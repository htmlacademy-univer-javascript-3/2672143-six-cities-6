interface Props {
  children: React.ReactNode;
}

export const Container: React.FC<Props> = (props: Props) => {
  const { children } = props;
  return <div className="container">{children}</div>;
};
