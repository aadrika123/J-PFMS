import React from "react";

interface NextButtonProps {
  onClick?: () => void;
}

const NextButton: React.FC<NextButtonProps> = ({
  ...props
}) => {
  return (
    <button
      className={"bg-primary_bg_indigo p-2.5 px-5 text-[0.875rem] flex items-center gap-3 btn-neutral hover:border-neutral-400 rounded-md font-medium text-white hover:bg-neutral-700 hover:text-white"}
      {...props}
    >
      Next

      <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="9"
            height="16"
            viewBox="0 0 9 16"
            fill="none"
          >
            <path
              d="M1 14.6771L7.64894 7.83853L1 1"
              stroke="white"
              strokeWidth="1.97006"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
      </span>

    </button>
  );
};

export default NextButton;
