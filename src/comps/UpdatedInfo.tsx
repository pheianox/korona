interface Props {
  value: number;
}

export const UpdatedInfo: React.FC<Props> = (props) => (
  <p>
    {new Intl.DateTimeFormat("en-EU", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(props.value)}
  </p>
);
