"use client";

import { cn } from "../../lib/utils";
import { HTMLMotionProps } from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";

interface AnimatedSubscribeButtonProps
  extends Omit<HTMLMotionProps<"button">, "ref"> {
  subscribeStatus?: boolean;
  children: React.ReactNode;
  className?: string;
  currentLanguage: "en" | "es";
  onLanguageToggle: () => void;
}

export const AnimatedSubscribeButton = React.forwardRef<
  HTMLButtonElement,
  AnimatedSubscribeButtonProps
>(
  (
    { subscribeStatus = false, onClick, className, children, currentLanguage, onLanguageToggle, ...props },
    ref,
  ) => {
    const [isSubscribed, setIsSubscribed] = useState<boolean>(subscribeStatus);

    if (
      React.Children.count(children) !== 2 ||
      !React.Children.toArray(children).every(
        (child) => React.isValidElement(child) && child.type === "span",
      )
    ) {
      throw new Error(
        "AnimatedSubscribeButton expects two children, both of which must be <span> elements.",
      );
    }

    const childrenArray = React.Children.toArray(children);
    const initialChild = childrenArray[0];
    const changeChild = childrenArray[1];

    return (
      <AnimatePresence mode="wait">
        {isSubscribed ? (
          <motion.button
            ref={ref}
            className={cn(
              "relative flex h-10 w-fit items-center justify-center overflow-hidden rounded-lg bg-primary px-6 text-primary-foreground",
              className,
            )}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              setIsSubscribed(false);
              onLanguageToggle();
              onClick?.(e);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            {...props}
          >
            <motion.span
              key="action"
              className="relative flex h-full w-full items-center justify-center font-semibold"
              initial={{ y: -50 }}
              animate={{ y: 0 }}
            >
              {changeChild}
            </motion.span>
          </motion.button>
        ) : (
          <motion.button
            ref={ref}
            className={cn(
              "relative flex h-10 w-fit cursor-pointer items-center justify-center rounded-lg border-none bg-primary px-6 text-primary-foreground",
              className,
            )}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              setIsSubscribed(true);
              onLanguageToggle();
              onClick?.(e);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            {...props}
          >
            <motion.span
              key="reaction"
              className="relative flex items-center justify-center font-semibold"
              initial={{ x: 0 }}
              exit={{ x: 50, transition: { duration: 0.1 } }}
            >
              {initialChild}
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>
    );
  },
);

AnimatedSubscribeButton.displayName = "AnimatedSubscribeButton";