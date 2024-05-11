"use client";
import React, { Suspense } from "react";
import Header from "../global/layout/Header";
import Sidebar from "../global/layout/Sidebar";
import Loading from "./Loading";

import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";



interface PageLayoutProps {
  children: React.ReactNode;
}
// style={{ zoom: "80%" }}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  // max-sm:hidden max-md:hidden
  return (
    <>
      <main>
          <Suspense fallback={<Loading />}>
          <div className="h-screen">
            <Header onClick={toggleDrawer} />
            <div className="flex">
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction="left"
              >
                <Sidebar
                  className={`hide-scrollbar shadow-lg border-r overflow-y-auto overflow-x-hidden z-10 w-full`}
                />
              </Drawer>
              <section
                style={{ height: "calc(100vh - 3.5rem)" }}
                className="hide-scrollbar w-full overflow-y-auto bg-gray-100 p-5"
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
