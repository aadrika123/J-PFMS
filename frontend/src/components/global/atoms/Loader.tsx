import React from "react";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 03-02-2024
 * | Created for- Loader
 * | Status- done
 */

type LoaderProps = {
  className?: string;
  height?: string;
};

const Loader: React.FC<LoaderProps> = (props) => {
  const {height = 'h-[60vh]'} = props
  return (
    <>
      <div
        className={`w-full ${height} flex items-center justify-center ${props.className}`}
      >
        <span className="loading loading-dots loading-lg"></span>
      </div>
    </>
  );
};

export default Loader;
