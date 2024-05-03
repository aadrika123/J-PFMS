import React from "react";

interface PrevButtonProps {
  onClick?: () => void;
}

const PrevButton: React.FC<PrevButtonProps> = ({
  ...props
}) => {
  return (
    <button
      className={"bg-primary_bg_indigo p-2.5 px-5 text-[0.875rem] flex items-center gap-3 btn-neutral hover:border-neutral-400 rounded-md font-medium text-white hover:bg-neutral-700 hover:text-white"}
      {...props}
    >
      <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="9"
                    height="16"
                    viewBox="0 0 9 16"
                    fill="none"
                  >
                    <path
                      d="M7.72461 0.999692L0.999246 7.83822L7.72461 14.6768"
                      stroke="white"
                      strokeWidth="1.97006"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
        </span>
      Prev
    </button>
  );
};

export default PrevButton;
