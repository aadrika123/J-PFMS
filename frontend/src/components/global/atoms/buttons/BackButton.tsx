import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface NextButtonProps {
  onClick?: () => void;
}

const buttonVariants = cva(
  `p-2.5 px-5 text-[0.875rem] flex items-center gap-3 btn-neutral hover:border-neutral-400 rounded-md font-medium text-white hover:bg-neutral-700 hover:text-white`,
  {
    variants: {
      variant: {
        primary: "bg-primary_bg_indigo",
        danger: "bg-red-400",
        cancel:
          "bg-white border text-neutral-800 border-primary_bg_indigo hover:bg-neutral-50  hover:text-neutral-700",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

const className = "";
const variant = "cancel";

const BackButton: React.FC<NextButtonProps> = ({
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ className, variant }))}
      {...props}
    >
      Back
    </button>
  );
};

export default BackButton;
