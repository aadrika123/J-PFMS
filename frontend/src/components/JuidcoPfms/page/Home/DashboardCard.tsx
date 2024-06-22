// import Image from "next/image";
// import React from "react";

// interface DashboardCardProps {
//   title: string;
//   svgCode: string;
//   isDarkMode: boolean;
// }

// const DashboardCard: React.FC<DashboardCardProps> = ({
//   title,
//   svgCode,
//   isDarkMode,
// }) => {
// // const cardStyle = isDarkMode ? "#2F3139" : "#4338CA";

//   return (
//     <div
//       className={`rounded-[23.88px]`}
//       style={{ backgroundColor: isDarkMode ? "#2F3139" : "#4338CA" }}
//     >
//       <div className="m-8">
//         <div className="flex items-center">
//           <Image src={svgCode} alt="img" />
//           <p className="m-4">{title}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardCard;
"use client"
import Image from "next/image";
import React from "react";

interface DashboardCardProps {
  title: string;
  svgCode: string;
  isDarkMode: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  svgCode,
  isDarkMode,
}) => {
  // Define the linear gradient styles for dark and light modes
  const darkModeGradient = "linear-gradient(135deg, #1E1F25 0%, #292B34 100%)";
  const lightModeGradient = "linear-gradient(135deg, #4338CA 0%, #219AE8 100%)";

  const gradientTextStyle = {
    background: "linear-gradient(90deg, #219BE8, #FFFFFF)", // Gradient from #219BE8 to #FFFFFF
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };
  return (
    <div
      className={`rounded-[23.88px]`}
      style={{
        background: isDarkMode ? darkModeGradient : lightModeGradient,
      }}
    >
      <div className="m-8">
        <div className="flex items-center">
          <Image src={svgCode} alt="img" />
          {/* <Image src={svgCode} alt="img" /> */}
          <p className={`m-4 ${isDarkMode ? "text-white" : "text-black"}`}>
            {title}
          </p>
        </div>
        <div className="flex justify-center m-4">
          <b className="flex justify-start text-[37.96px]">11</b>
          <h1 className="mt-4">
            {" "}
            <span
              className="font-semibold text-color"
              style={gradientTextStyle}
            >
              +25%
            </span>
            from yesterday
          </h1>
        </div>


        
      </div>
    </div>
  );
};

export default DashboardCard;
