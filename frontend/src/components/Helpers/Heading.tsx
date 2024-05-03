import React from "react";

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

export const SubHeading: React.FC<HeadingProps> = (props) => {
  return (
    <h2
      className={`text-secondary text-sub_head font-semibold ${props.className}`}
    >
      {props.children}
    </h2>
  );
};
