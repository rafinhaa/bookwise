import { Container } from "./styles";

import { TextAreaProps } from "./types";

export const TextArea = ({ maxLength, ...props }: TextAreaProps) => {
  const valueLength = String(props.value)?.length ?? 0;

  return (
    <Container>
      <textarea {...props} maxLength={maxLength} />
      {maxLength && (
        <span>
          {valueLength}/{maxLength}
        </span>
      )}
    </Container>
  );
};
