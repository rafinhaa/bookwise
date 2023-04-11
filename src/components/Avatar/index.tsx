import { AvatarImage, AvatarContainer } from "./styles";

import { AvatarProps } from "./types";

export const Avatar = ({ src, alt, size = "md", ...props }: AvatarProps) => {
  return (
    <AvatarContainer size={size} {...props}>
      <AvatarImage src={src} width={80} height={80} alt={alt} />
    </AvatarContainer>
  );
};
