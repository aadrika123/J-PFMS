import React from "react";

/**
 * | Author- Krish
 * | Created On- 15-01-2024
 * | Created for- Heading
 * | Status- done
 */

interface HeadingProps {
  children: React.ReactNode;
  className?: string;
}

export const Heading: React.FC<HeadingProps> = (props) => {
  return (
    <h2
      className={`text-secondary text-sub_head font-semibold ${props.className}`}
    >
      {props.children}
    </h2>
  );
};
