import Button from "@/components/global/atoms/Button";
import React from "react";

interface ResetButtonProps {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const ResetButton: React.FC<ResetButtonProps> = ({
  ...props
}) => {
    
  return (
    <Button className="w-full" variant="primary" {...props}>Reset</Button>
  );
};
