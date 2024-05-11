import React from "react";
import Button from "@/components/global/atoms/buttons/Button";


const HomeHeader = () => {
  return (
    <div className="bg-white flex items-center justify-between p-4 shadow-lg border">
      <div>
        <h2 className="text-secondary_black text-base font-semibold max-sm:text-sm">
          Finance Home Page
        </h2>

        <p className="text-sm flex items-center max-sm:text-xs">
          <svg
            width="15"
            height="15"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <rect width="30" height="30" fill="url(#pattern0)" />
            <defs>
              <pattern
                id="pattern0"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use xlinkHref="#image0_430_4508" transform="scale(0.01)" />
              </pattern>
              <image
                id="image0_430_4508"
                width="100"
                height="100"
                xlinkHref="data:image/png;base64,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"
              />
            </defs>
          </svg>
          verified account
        </p>
      </div>
      <div className="flex items-center max-sm:flex-col gap-1">
        <Button
          variant="primary"
          className="mr-2 bg-white text-secondary_black shadow-lg border rounded-2xl max-sm:text-[10px] text-nowrap"
        >
          Change Password
        </Button>
        <Button variant="primary" className="shadow-xl border rounded-2xl max-sm:text-[10px]">
          View Profile
        </Button>
      </div>
    </div>
  );
};

export default HomeHeader;
