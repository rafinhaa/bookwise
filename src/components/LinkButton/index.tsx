import { CaretLeft, CaretRight } from "phosphor-react";

import { LinkButtonContainer } from "./styles";

import { LinkButtonProps } from "./types";

export const LinkButton = ({
  text,
  href,
  onClick,
  iconSide = "right",
  withoutIcon,
  ...props
}: LinkButtonProps) => {
  return (
    <LinkButtonContainer
      {...props}
      href={href!}
      iconSide={iconSide}
      onClick={onClick}
      as={onClick ? "button" : undefined}
    >
      {text}
      {!withoutIcon && (iconSide === "right" ? <CaretRight /> : <CaretLeft />)}
    </LinkButtonContainer>
  );
};
