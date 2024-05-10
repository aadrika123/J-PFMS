import React from "react";

interface FilterButtonProps {
  onClick?: () => void;
  active: boolean;
  className?: string;
  disabled?: boolean;
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  ...props
}) => {
    
  return (

    <button {...props}>
      <svg
                  width="56"
                  height="46"
                  viewBox="0 0 56 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="55"
                    height="45"
                    rx="7.5"
                    fill={props.active?"#4338ca":"none"}
                  />
                  <rect
                    x="0.5"
                    y="0.5"
                    width="55"
                    height="45"
                    rx="7.5"
                    stroke="#A19BE4"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.2817 17.0416C18.34 15.2475 19.645 12.0046 22.2881 12.0555L33.287 12.2675C35.9301 12.3184 37.1093 15.6092 35.0999 17.3271L30.8146 20.9909C30.6066 21.1688 30.4845 21.4272 30.4793 21.7008L30.2912 31.4622C30.2583 33.1694 28.1776 33.9846 26.9937 32.7542L25.1143 30.8009C24.7619 30.4346 24.5694 29.9433 24.5791 29.4351L24.7303 21.59C24.7356 21.3164 24.6236 21.0535 24.4225 20.8677L20.2817 17.0416ZM22.2512 13.9718C21.3702 13.9548 20.9352 15.0358 21.5824 15.6338L25.7233 19.46C26.3265 20.0173 26.6625 20.8059 26.6467 21.6269L26.4955 29.472L28.3748 31.4253L28.563 21.6639C28.5788 20.8428 28.9449 20.0677 29.5691 19.5341L33.8544 15.8703C34.5241 15.2977 34.1311 14.2008 33.2501 14.1838L22.2512 13.9718Z"
                    fill="#8F9399"
                  />
                </svg>
    </button>
  );
};
