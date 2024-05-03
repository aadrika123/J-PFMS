import React from "react";
import { Heading } from "../atoms/Heading";
import Button from "../atoms/Button";

interface PopupProps {
  children: React.ReactNode;
  title?: string;
  icon?: React.ReactHTMLElement<HTMLSpanElement>;
  closeModal?: () => void;
  bgColor? : string;
  width?: string;
  height?: string;
  opacity?: string;
  padding?: string;
}

const Popup: React.FC<PopupProps> = ({ children, title, closeModal, width="70%", bgColor="white", opacity="", padding="5" }) => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-40 z-30"></div>
      <section className={`fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[${width}] max-h-[90%] overflow-auto z-50 rounded-xl hide-scrollbar`}>
        <div className="relative z-50 ">
          <div className={`w-full rounded-lg h-auto backdrop-blur-lg bg-${bgColor} border shadow-lg flex flex-col ${opacity} p-${padding}`}>
            {title && <Heading>{title}</Heading>}
            <div className="flex flex-col w-full gap-5 mt-5">{children}</div>
            {closeModal && (
              <div className="w-full mt-4 flex items-center justify-end gap-2">
                <Button
                  onClick={closeModal}
                  variant={"cancel"}
                  className={"w-24"}
                >
                  Close
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Popup;
