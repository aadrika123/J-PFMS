"use client";
import React, { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import livesvg from "../../../../assets/svg/live.svg";
import livesvg1 from "../../../../assets/svg/livelight.svg";

import closedsvg from "../../../../assets/svg/projectclosed.svg";
import closedsvg1 from "../../../../assets/svg/closedlight.svg";

import rejectedsvg from "../../../../assets/svg/reject.svg";
import rejectedsvg1 from "../../../../assets/svg/rejeclight.svg";

import completedsvg from "../../../../assets/svg/completed.svg";
import completedsvg1 from "../../../../assets/svg/completedlight.svg";

import dynamic from "next/dynamic";

/// MUI Imports
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
// import { MapContainer } from "react-leaflet";
// import CustomMap from "./MapGraph";

const DynamicLineColumnChart = dynamic(
  () => import("../../../JuidcoPfms/page/Home/LineColumnChart"),
  {
    ssr: false,
  }
);

const RadialBarChart1 = dynamic(
  () => import("../../../JuidcoPfms/page/Home/RadialBarChart"),
  {
    ssr: false,
  }
);
// ..............
const PieChart1 = dynamic(
  () => import("../../../JuidcoPfms/page/Home/PieChart"),
  {
    ssr: false,
  }
);

const DoubleBarChart1 = dynamic(
  () => import("../../../JuidcoPfms/page/Home/BarChart"),
  {
    ssr: false,
  }
);

const Home: React.FC = () => {
  const darkCompletedSvg1 = { completedsvg };
  const lightCompletedSvg1 = { completedsvg1 };
  const darkCompletedSvg2 = { completedsvg };
  const lightCompletedSvg2 = { completedsvg1 };
  const darkCompletedSvg5 = { rejectedsvg };
  const lightCompletedSvg5 = { rejectedsvg1 };
  const darkCompletedSvg4 = { closedsvg };
  const lightCompletedSvg4 = { closedsvg1 };
  const darkCompletedSvg3 = { livesvg };
  const lightCompletedSvg3 = { livesvg1 };

  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const [filter, set_filter] = useState(false);

  const handle_filter_open = () => {
    set_filter(!filter);
  };

  const textColor = isDarkMode ? "#FFFFFF" : "#000000";

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    window.localStorage.foo = "bar";
  }, []);

  //
  // const mapCenter: [number, number] = [22.8055, 86.1627]; // Example center coordinates for Jharkhand
  // const mapZoom: number = 7; // Example zoom level
  return (
    <>
      <div className="flex flex-1 flex-row">
        <div
          className="overflow-auto flex-1 rounded-md"
          style={{
            backgroundColor: isDarkMode ? "black" : " #f2f2f2",
            color: isDarkMode ? "white" : "black",
          }}
        >
          <div className="flex items-center justify-between p-4">
            {/* <div className="flex space-x-4">
              <button className="px-4 py-2 text-white font-bold">
                Project 1
              </button>
              <button className="px-4 py-2  text-white font-bold ">
                Project 2
              </button>
              {/* Projects Dropdown */}
            {/* <div className="relative inline-block text-left">
                <select
                  className={`w-full px-4 py-2  text-black rounded-xl bg-transparent font-bold ${isDarkMode ? "text-white font-bold" : "text-black font-bold"}`}
                >
                  <option value="project3">Project</option>
                  <option value="project4">Project 1</option>
                  <option value="project5">Project 2</option>
                  <option value="project5">Project 3</option>
                  <option value="project5">Project 4</option>
                </select>
              </div>
            </div> */}

            <div className="flex justify-end space-x-3 flex-1 ml-4">
              <button
                className="text-sm rounded-lg p-2.5 font-semibold bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                onClick={toggleTheme}
              >
                {isDarkMode ? "Dark Mode" : "Light Mode"}
              </button>

              {/* <input
                type="checkbox"
                className="hidden"
                id="darkmode-toggle"
                checked={isDarkMode}
                onChange={toggleTheme}
              />
              <label
                className=" w-[65px] h-[30px] relative block bg-gray-300 rounded-full shadow-inner cursor-pointer transition-all"
                htmlFor="darkmode-toggle"
              >
                {isDarkMode ? (
                  <WbSunnyIcon
                    className="cursor-pointer w-10 h-10 "
                    onClick={toggleTheme}
                  />
                ) : (
                  <DarkModeIcon
                    className="cursor-pointer w-10 h-10 "
                    onClick={toggleTheme}
                  />
                )}
              </label> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="53"
                height="44"
                viewBox="0 0 53 44"
                fill="none"
                onClick={handle_filter_open}
                className="cursor-pointer"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="52"
                  height="43"
                  rx="7.5"
                  fill="white"
                  stroke="#A19BE4"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.0901 15.9818C17.1143 14.2255 18.3566 10.958 21.0002 10.958H32.0011C34.6446 10.958 35.887 14.2255 33.9111 15.9818L29.6972 19.7274C29.4926 19.9093 29.3756 20.17 29.3756 20.4437V30.2069C29.3756 31.9145 27.3111 32.7696 26.1037 31.5622L24.187 29.6455C23.8276 29.286 23.6256 28.7985 23.6256 28.2902V20.4437C23.6256 20.17 23.5086 19.9093 23.304 19.7274L19.0901 15.9818ZM21.0002 12.8747C20.119 12.8747 19.7049 13.9638 20.3635 14.5493L24.5773 18.2949C25.1912 18.8405 25.5423 19.6225 25.5423 20.4437V28.2902L27.459 30.2069V20.4437C27.459 19.6225 27.8101 18.8405 28.4239 18.2949L32.6378 14.5493C33.2964 13.9638 32.8823 12.8747 32.0011 12.8747H21.0002Z"
                  fill="#8F9399"
                />
              </svg>
              {/* <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 400,
                  borderRadius: "28.2px",
                  backgroundColor: isDarkMode ? "#1E1F25" : "white",
                  color: isDarkMode ? "white" : "black",
                  "& input::placeholder": {
                    color: isDarkMode ? "white" : "#1E1F25",
                  },
                }}
              >
                <IconButton sx={{ p: "10px" }} aria-label="menu">
                  <svg
                    width="27"
                    height="27"
                    viewBox="0 0 27 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.6103 19.3663L25.2683 25.0652M22.6534 11.9908C22.6534 17.7674 17.9706 22.4503 12.1939 22.4503C6.41726 22.4503 1.73438 17.7674 1.73438 11.9908C1.73438 6.21413 6.41726 1.53125 12.1939 1.53125C17.9706 1.53125 22.6534 6.21413 22.6534 11.9908Z"
                      stroke="#219BE8"
                      strokeWidth="2.61488"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search Projects"
                  inputProps={{ "aria-label": "search google maps" }}
                />

                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton
                  onClick={handle_filter_open}
                  color="primary"
                  sx={{ p: "10px" }}
                  aria-label="directions"
                >
                  <svg
                    width="23"
                    height="17"
                    viewBox="0 0 23 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.35156 4.09784H8.7818M8.7818 4.09784C8.7818 5.46571 9.89064 6.57459 11.2585 6.57459C12.6265 6.57459 13.7353 5.46571 13.7353 4.09784M8.7818 4.09784C8.7818 2.72997 9.89064 1.62109 11.2585 1.62109C12.6265 1.62109 13.7353 2.72997 13.7353 4.09784M13.7353 4.09784H21.1655M1.35156 12.7665H16.212M16.212 12.7665C16.212 14.1344 17.3209 15.2432 18.6888 15.2432C20.0567 15.2432 21.1655 14.1344 21.1655 12.7665C21.1655 11.3985 20.0567 10.2897 18.6888 10.2897C17.3209 10.2897 16.212 11.3985 16.212 12.7665Z"
                      stroke="#636974"
                      strokeWidth="1.85756"
                      strokeLinecap="round"
                    />
                  </svg>
                </IconButton>
              </Paper> */}
            </div>
          </div>

          <div className="flex p-4 w-full grid-cols-5 gap-4 justify-between  ">
            <DashboardCard
              title="Projects Completed"
              svgCode={
                isDarkMode
                  ? darkCompletedSvg1.completedsvg
                  : lightCompletedSvg1.completedsvg1
              }
              isDarkMode={isDarkMode}
            />
            <DashboardCard
              title="Projects Delayed"
              svgCode={
                isDarkMode
                  ? darkCompletedSvg2.completedsvg
                  : lightCompletedSvg2.completedsvg1
              }
              isDarkMode={isDarkMode}
            />

            <DashboardCard
              title="Live / Running Projects"
              svgCode={
                isDarkMode
                  ? darkCompletedSvg3.livesvg
                  : lightCompletedSvg3.livesvg1
              }
              isDarkMode={isDarkMode}
            />
            <DashboardCard
              title="Projects Closed"
              svgCode={
                isDarkMode
                  ? darkCompletedSvg4.closedsvg
                  : lightCompletedSvg4.closedsvg1
              }
              isDarkMode={isDarkMode}
            />
            <DashboardCard
              title="Projects Reject"
              svgCode={
                isDarkMode
                  ? darkCompletedSvg5.rejectedsvg
                  : lightCompletedSvg5.rejectedsvg1
              }
              isDarkMode={isDarkMode}
            />
          </div>
          {/* third part */}
          <div className="flex justify-start m-4">
            <div>
              <p>
                ULB:
                <span
                  className={isDarkMode ? "text-[#FFC11B]" : "text-[#000000]"}
                >
                  <b> Ranchi Municipal Corporation</b>
                </span>
              </p>
              <p
                className="font-semibold"
                style={{ color: textColor, fontSize: "61.32px" }}
              >
                Financial Details
              </p>

              <select
                name=""
                id=""
                className="rounded-xl w-[240px] h-[51px] bg-transparent flex justify-center text-center text-white"
                style={{
                  background: isDarkMode
                    ? "#1E1F25" // Dark mode background color
                    : "linear-gradient(135deg, #4338CA 0%, #211C64 100%)", // Light mode gradient background
                  padding: "1px", // Ensure padding to show the gradient border
                  border: "none", // Remove default border
                  color: "#FFFFFF",
                }}
              >
                <option
                  value="road-construction"
                  className="text-black text-center"
                >
                  Running Project
                </option>
                <option value="building-construction" className="text-black">
                  Building Construction
                </option>
                <option value="constructing-stadium" className="text-black">
                  Constructing a Stadium
                </option>
                <option value="building-school" className="text-black">
                  Building School
                </option>
              </select>
            </div>
          </div>

          {/* Fourth part */}
          <div className="flex m-4 gap-2">
            <div
              className="w-[30%] rounded-xl"
              style={{ backgroundColor: isDarkMode ? "#1E1F25" : "#FFFFFF" }}
            >
              {/* <SpeedoMeter /> */}
              <RadialBarChart1 />
            </div>

            <div
              id="chart"
              className="w-[70%] rounded-xl"
              style={{ backgroundColor: isDarkMode ? "#1E1F25" : "#FFFFFF" }}
            >
              <DynamicLineColumnChart />
            </div>
          </div>

          {/* fifth part */}
          <div className="flex justify-start m-4">
            <div>
              <p>
                ULB:
                <span
                  className={isDarkMode ? "text-[#FFC11B]" : "text-[#000000]"}
                >
                  <b> Ranchi Municipal Corporation</b>
                </span>
              </p>
              <p
                className="font-semibold"
                style={{ color: textColor, fontSize: "61.32px" }}
              >
                ULB & District{" "}
              </p>
            </div>
          </div>
          {/* sixth part */}

          <div className="flex m-4 gap-2">
            <div
              className="w-[30%] rounded-xl"
              style={{ backgroundColor: isDarkMode ? "#1E1F25" : "#FFFFFF" }}
            >
              <PieChart1 isDarkMode={isDarkMode} />
            </div>

            <div
              id="chart1"
              className="w-[70%] rounded-xl flex justify-between items-center"
              style={{ backgroundColor: isDarkMode ? "#1E1F25" : "#FFFFFF" }}
            >
              <div className="w-full">
                <DoubleBarChart1 />
              </div>
            </div>
          </div>

          {/* sevent part  */}
          <div
            className="flex  flex-1 rounded-xl  m-4 gap-2"
            style={{ backgroundColor: isDarkMode ? "#1E1F25" : "#FFFFFF" }}
          >
            {/* <CustomMap center={mapCenter} zoom={mapZoom} /> */}
          </div>
        </div>

        <div
          className={`bg-white   ${filter ? "flex" : "hidden"}`}
          style={{
            width: "25%",
            backgroundColor: isDarkMode ? "#1E1F25" : "white",
          }}
        >
          <div>
            <div
              className={`flex flex-col items-center  text-center m-14 ${isDarkMode ? "text-white" : "text-black"}`}
            >
              <div
                className={`flex items-center ${isDarkMode ? "text-[#A2A2A2]" : ""}`}
              >
                Search Projects & Others in Ease!!!
              </div>
              <h1 className="text-2xl font-semibold">Find Matching Results</h1>
            </div>
            <div className="mt-8 flex justify-center items-center">
              <input
                type="text"
                placeholder="Search projects..."
                className={`pl-14 px-4 py-2 border rounded-[15px] flex justify-center items-center ${
                  isDarkMode
                    ? "bg-[#292D32] text-white placeholder-white"
                    : "bg-[#EBEBEB] text-black placeholder-gray-400"
                }`}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='27' height='27' viewBox='0 0 27 27' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19.6103 19.3663L25.2683 25.0652M22.6534 11.9908C22.6534 17.7674 17.9706 22.4503 12.1939 22.4503C6.41726 22.4503 1.73438 17.7674 1.73438 11.9908C1.73438 6.21413 6.41726 1.53125 12.1939 1.53125C17.9706 1.53125 22.6534 6.21413 22.6534 11.9908Z' stroke='%23219BE8' stroke-width='2.61488' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundSize: "20px 20px",
                  backgroundPosition: "10px center",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </div>
            {/* search panel Date picker */}
            <div className="m-8">
              <Accordion
                sx={{
                  backgroundColor: isDarkMode ? "#1E1F25" : "white",
                  color: isDarkMode ? "white" : "black",
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      className={`${isDarkMode ? "text-white" : "text-black"}`}
                    />
                  }
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <div>
                    Date <br />
                    Most projects in June 2022
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateRangePicker"]}>
                      <DateRangePicker
                        sx={{
                          backgroundColor: isDarkMode ? "#1E1F25" : "white",
                          color: isDarkMode ? "white" : "black",
                        }}
                        localeText={{ start: "From Date", end: "To Date" }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </AccordionDetails>
              </Accordion>

              <Accordion
                sx={{
                  backgroundColor: isDarkMode ? "#1E1F25" : "white",
                  color: isDarkMode ? "white" : "black",
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      className={`${isDarkMode ? "text-white" : "text-black"}`}
                    />
                  }
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <div className="flex flex-row">
                    <div
                      className={`flex ${isDarkMode ? "text-gray-400 font-bold" : "text-black fontbold"}`}
                    >
                      ULB Name:
                    </div>
                    <div
                      className={`flex ${isDarkMode ? "text-white font-bold" : "text-black fontbold"}`}
                    >
                      Ranchi Muncipal Corporation
                    </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails></AccordionDetails>
              </Accordion>

              <Accordion
                sx={{
                  backgroundColor: isDarkMode ? "#1E1F25" : "white",
                  color: isDarkMode ? "white" : "black",
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      className={`${isDarkMode ? "text-white" : "text-black"}`}
                    />
                  }
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <div className="flex flex-row">
                    <div
                      className={`flex ${isDarkMode ? "text-gray-400 font-bold" : "text-black fontbold"}`}
                    >
                      Ward No :
                    </div>
                    <div
                      className={`flex ${isDarkMode ? "text-white font-bold" : "text-black fontbold"}`}
                    >
                      21
                    </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails></AccordionDetails>
              </Accordion>

              <Accordion
                sx={{
                  backgroundColor: isDarkMode ? "#1E1F25" : "white",
                  color: isDarkMode ? "white" : "black",
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      className={`${isDarkMode ? "text-white" : "text-black"}`}
                    />
                  }
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <div className="flex flex-row">
                    <div
                      className={`flex ${isDarkMode ? "text-gray-400 font-bold" : "text-black fontbold"}`}
                    >
                      Department Name :
                    </div>
                    <div
                      className={`flex ${isDarkMode ? "text-white font-bold" : "text-black fontbold"}`}
                    >
                      Inventory
                    </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails></AccordionDetails>
              </Accordion>

              <Accordion
                sx={{
                  backgroundColor: isDarkMode ? "#1E1F25" : "white",
                  color: isDarkMode ? "white" : "black",
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      className={`${isDarkMode ? "text-white" : "text-black"}`}
                    />
                  }
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <div className="flex flex-row">
                    <div
                      className={`flex ${isDarkMode ? "text-gray-400 font-bold" : "text-black fontbold"}`}
                    >
                      TRN :
                    </div>
                    <div
                      className={`flex ${isDarkMode ? "text-white font-bold" : "text-black fontbold"}`}
                    >
                      #98980
                    </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails></AccordionDetails>
              </Accordion>

              <div className="flex flex-row m-8">
                <div
                  className={`flex ${isDarkMode ? "text-gray-400 font-bold" : "text-black fontbold"}`}
                >
                  Project Name :
                </div>
                <div
                  className={`flex ${isDarkMode ? "text-white font-bold" : "text-black fontbold"}`}
                >
                  Project X
                </div>
              </div>
              <div className="flex flex-1 justify-center items-center">
                <button className=" w-full h-[60px] font-semibold mt-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 text-white">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
