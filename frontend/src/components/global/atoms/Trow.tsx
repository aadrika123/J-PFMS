import React, { ReactNode } from "react";

interface TheadProps {
  children: ReactNode;
  key?: string | number;
  className?: string;
}

const Trow: React.FC<TheadProps> = (props) => {
  const {key, className} = props;

  return (
    <tr
      key={`row-${key}`}
      className={`${className}`}
    >
        {props.children}
    </tr>
  );
};

export default Trow;
