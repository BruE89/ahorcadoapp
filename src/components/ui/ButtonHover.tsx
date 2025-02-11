import React from "react";
import { InteractiveHoverButton } from "./interactive-hover-button";

interface ButtonHoverProps {
  onClick: () => void;
  language: "en" | "es";
}

const ButtonHover: React.FC<ButtonHoverProps> = ({ onClick, language }) => {
  const buttonText = language === "en" ? "Reset" : "Reiniciar";

  return (
    <InteractiveHoverButton onClick={onClick}>
      {buttonText}
    </InteractiveHoverButton>
  );
};

export { ButtonHover };