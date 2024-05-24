"use client";

import React from "react";
// import { usePathname } from "next/navigation";
// import { formatString } from "@/utils/helper";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/reducers/authReducer";
import Button from "../atoms/buttons/Button";
import { useWorkingAnimation } from "../molecules/general/useWorkingAnimation";

interface SideBarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  onClick?: () => void;
}

const Header: React.FC<SideBarProps> = (props) => {
  // const pathName = usePathname();
  const dispatch = useDispatch();
  const [workingAnimation, activateWorkingAnimation] = useWorkingAnimation();

  //__________ Logout Functionality _____________//
  const handleClick = () => {
    activateWorkingAnimation();
    dispatch(logout());
    window.location.reload();
  };

  // _________ Bread Crumb ________________//
  // const breadCrumb = pathName
  //   .split("/")
  //   .filter((k) => k !== "")
  //   .map((part, index) => {
  //     const replaced = part.includes("finance")
  //       ? part.replace("finance", "Financial Accounts Management System")
  //       : part;

  //     const bread = replaced.replace(/\d+$/, "");

  //     return (
  //       <React.Fragment key={index}>
  //         {index > 0 && (
  //           <img className="px-2" src="/icons/svg/right.svg" alt=">" />
  //         )}
  //         {formatString(bread)}
  //       </React.Fragment>
  //     );
  //   });
  // _________ Bread Crumb ________________//

  return (
    
    <>
    {workingAnimation}

    <div
      className={`border-b sticky top-0 shadow-md flex h-[3.5rem] items-center justify-between px-5  ${props.className}`}
    >
      <div className="flex items-center">
        <span onClick={props.onClick} className="mr-2 cursor-pointer">
        <svg
          width="28"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 18L20 18"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M4 12L20 12"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M4 6L20 6"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        </span>
        <h1 className="text-[1.4rem] text-primary font-bold">
          PROJECT AND FUND MANAGEMENT SYSTEM
        </h1>
        {/* <div className="text-sm breadcrumbs p-0">
          <ul className="text-[#625e5eb7]">
            <li>
              <a className="text-primary font-medium">E-Governance</a>
            </li>
            <li>{breadCrumb}</li>
          </ul>
        </div> */}
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="primary"
          onClick={handleClick}
          className="w-12 flex items-center justify-center rounded-xl"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="18"
              viewBox="0 0 17 17"
              fill="none"
            >
              <path
                d="M2.59436 12.1524H3.76145C3.84114 12.1524 3.91584 12.1872 3.96565 12.2487C4.08186 12.3898 4.20637 12.5259 4.33752 12.6554C4.87393 13.1923 5.50931 13.6202 6.20852 13.9155C6.93292 14.2214 7.71151 14.3784 8.49787 14.377C9.29309 14.377 10.0634 14.2209 10.7872 13.9155C11.4864 13.6202 12.1218 13.1923 12.6582 12.6554C13.1956 12.1203 13.6241 11.486 13.9199 10.7877C14.2271 10.0639 14.3815 9.29524 14.3815 8.50003C14.3815 7.70481 14.2254 6.93616 13.9199 6.21233C13.6244 5.5134 13.1994 4.8842 12.6582 4.34465C12.117 3.8051 11.4878 3.3801 10.7872 3.0846C10.0634 2.77913 9.29309 2.62307 8.49787 2.62307C7.70266 2.62307 6.93235 2.77747 6.20852 3.0846C5.50793 3.3801 4.87873 3.8051 4.33752 4.34465C4.20637 4.47581 4.08352 4.61194 3.96565 4.75139C3.91584 4.81282 3.83947 4.84768 3.76145 4.84768H2.59436C2.48977 4.84768 2.42502 4.73147 2.48313 4.64348C3.75647 2.66458 5.9844 1.35471 8.51613 1.36135C12.4939 1.37131 15.683 4.60032 15.6432 8.57307C15.6033 12.4827 12.4192 15.6387 8.49787 15.6387C5.97277 15.6387 3.75481 14.3305 2.48313 12.3566C2.42668 12.2686 2.48977 12.1524 2.59436 12.1524ZM1.11848 8.39544L3.47424 6.53606C3.56223 6.46633 3.69006 6.52942 3.69006 6.64065V7.90237H8.90295C8.976 7.90237 9.03576 7.96213 9.03576 8.03518V8.96487C9.03576 9.03792 8.976 9.09768 8.90295 9.09768H3.69006V10.3594C3.69006 10.4706 3.56057 10.5337 3.47424 10.464L1.11848 8.60462C1.1026 8.59219 1.08977 8.57632 1.08094 8.5582C1.07211 8.54008 1.06752 8.52018 1.06752 8.50003C1.06752 8.47987 1.07211 8.45997 1.08094 8.44185C1.08977 8.42373 1.1026 8.40786 1.11848 8.39544Z"
                fill="white"
              />
            </svg>
          </span>
        </Button>
        <Button
          variant="primary"
          className="w-12 flex items-center justify-center rounded-xl"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="18"
              viewBox="0 0 12 15"
              fill="none"
            >
              <path
                d="M6.00439 14.625C6.82939 14.625 7.50439 13.95 7.50439 13.125H4.50439C4.50439 13.95 5.17189 14.625 6.00439 14.625ZM10.5044 10.125V6.375C10.5044 4.0725 9.27439 2.145 7.12939 1.635V1.125C7.12939 0.5025 6.62689 0 6.00439 0C5.38189 0 4.87939 0.5025 4.87939 1.125V1.635C2.72689 2.145 1.50439 4.065 1.50439 6.375V10.125L0.00439453 11.625V12.375H12.0044V11.625L10.5044 10.125Z"
                fill="white"
              />
            </svg>
          </span>
        </Button>
      </div>
    </div>
    </>
  );
};

export default Header;
