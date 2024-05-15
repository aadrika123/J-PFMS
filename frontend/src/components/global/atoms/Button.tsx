import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../../lib/utils";

/**
 * | Author- Krish
 * | Created On- 02-02-2024
 * | Created for- Button
 * | Status- done
 */

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  buttontype?: string;
  variant: "primary" | "danger" | "cancel";
  disabled?: boolean;
}

const buttonVariants = cva(
  `p-2.5 px-5 text-[0.875rem] shadow-xl flex items-center gap-3 btn-neutral hover:border-neutral-400 rounded-md font-medium text-white hover:bg-indigo-600  hover:text-white`,
  {
    variants: {
      variant: {
        primary: "bg-primary_bg_indigo hover:text-white",
        danger: "bg-red-400 hover:text-white",
        cancel:
          "bg-white border text-neutral-800 border-primary_bg_indigo hover:bg-indigo-600  hover:text-white",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

const Button: React.FC<ButtonProps> = ({ className, variant, ...props }) => {
  return (
    <button
      type={props.buttontype as "submit" | "reset" | "button" | undefined}
      className={cn(buttonVariants({ className, variant }))}

      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
