import { InputContainer } from "./styles";

import { InputProps } from "./types";

export const Input = ({ icon, css, ...props }: InputProps) => {
  return (
    <InputContainer css={css}>
      <input {...props} />
      {icon}
    </InputContainer>
  );
};
