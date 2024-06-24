"use client";
import React, { Suspense, useEffect, useState } from "react";
import Header from "../global/layout/Header";
import Sidebar from "../global/layout/Sidebar";
import Loading from "./Loading";

interface PageLayoutProps {
  children: React.ReactNode;
}
// style={{ zoom: "80%" }}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  useEffect(() => {
    setIsExpanded(
      sessionStorage.getItem("isExpanded") == "false" ? false : true
    );
  }, [isExpanded]);
  const handleToggle = () => {
    sessionStorage.setItem("isExpanded", String(!isExpanded));
    setIsExpanded(!isExpanded);
  };
  // max-sm:hidden max-md:hidden
  return (
    <>
      <main>
        <Suspense fallback={<Loading />}>
          <div className="h-screen">
            <Header onClick={handleToggle} />
            <div className="flex">
              <Sidebar
                className={`hide-scrollbar shadow-lg border-r w-[25%] overflow-y-auto overflow-x-hidden z-1 transition-all duration-200 ${!isExpanded ? "w-0" : "max-tmp:absolute max-tmp:bg-white max-tmp:w-[40%] max-md:w-[50%] max-sm:w-[66%] max-xs:w-full"}`}
              />
              <section
                style={{ height: "calc(100vh - 3.5rem)" }}
                className="hide-scrollbar w-full overflow-y-auto bg-gray-50 p-5"
              >
                {children}
              </section>
            </div>
          </div>
        </Suspense>
      </main>
    </>
  );
};

export default PageLayout;
