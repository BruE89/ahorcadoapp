import { AnimatedSubscribeButton } from "./animated-subscribe-button";

interface AnimatedSubscribeButtonDemoProps {
  currentLanguage: "en" | "es";
  onLanguageToggle: () => void;
  className?: string; // Agregar className opcional
}

export function AnimatedSubscribeButtonDemo({
  currentLanguage,
  onLanguageToggle,
  className, // Recibir className
}: AnimatedSubscribeButtonDemoProps) {
  return (
    <AnimatedSubscribeButton
      currentLanguage={currentLanguage}
      onLanguageToggle={onLanguageToggle}
      className={className} // Pasar className correctamente
    >
      <span className="group inline-flex items-center">
        English
      </span>
      <span className="group inline-flex items-center">
        Español
      </span>
    </AnimatedSubscribeButton>
  );
}
