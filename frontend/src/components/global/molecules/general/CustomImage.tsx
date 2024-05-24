import React from "react";

type CustomImageProps = {
  src: string;
  height?: number;
  width?: number;
};

const CustomImage: React.FC<CustomImageProps> = (props) => {
  const { src, width } = props;

  const fileTypes = ["jpeg", "jpg", "pdf"];

  return (
    <>
      <img
        src={
          fileTypes.includes(`${src.split(".")[1]}`)
            ? `${process.env.img_base}${src}`
            : src
        }
        className={`h-[70px] w-[${width}px]`}
      />
    </>
  );
};

export default CustomImage;
