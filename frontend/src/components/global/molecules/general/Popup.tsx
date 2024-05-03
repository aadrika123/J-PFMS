import React from "react";
import { motion } from "framer-motion";


// Created By: Bijoy Paitandi
// User: Children element will be shown on a popup screen, also an optional title can be provided

interface PopupProps {
    title?: string | "",
    children: React.ReactNode;
    zindex?: number;
    width?: number;
}

const Popup: React.FC<PopupProps> = ({ title, children, zindex, width}: PopupProps) => {
    const zindex2 = zindex;
    
    const widthh = width || 40;
    return (

        <>
            <div className={`fixed top-0 left-0 w-full h-full bg-black opacity-40 z-${zindex}`}></div>
            <section className={`fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[${widthh}%] max-h-[90%] overflow-auto z-${zindex2} rounded-xl hide-scrollbar`}>
                <div className={`relative z-${zindex2}`}>

                    <div className=" w-full rounded-lg h-auto backdrop-blur-lg bg-white border shadow-lg flex flex-col  p-5">
                        <h2
                            className={`text-secondary text-sub_head font-semibold`}
                        >
                            {title}
                        </h2>
                        <div className="flex flex-col w-full gap-5 mt-5">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                {children}

                            </motion.div>

                        </div>
                        <div className="w-full mt-4 flex items-center justify-end gap-2"></div>
                    </div>


                </div>
            </section>
        </>
    );
};

export default Popup;
