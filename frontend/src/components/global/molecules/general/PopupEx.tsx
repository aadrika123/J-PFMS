import React from "react";
import { motion } from "framer-motion";


// Created By: Bijoy Paitandi
// User: Children element will be shown on a popup screen, also an optional title can be provided


interface PopupExProps {
    title?: string | "",
    children: React.ReactNode;
}

const PopupEx: React.FC<PopupExProps> = ({title, children}: PopupExProps) => {
    return (

        <>
            <div className={`fixed top-0 left-200 w-full h-full bg-black opacity-40 z-[1]`}></div>
            <section className={`fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[90%] max-h-[90%] overflow-auto z-[2] rounded-xl hide-scrollbar`}>
                <div className={`relative z-[2]`}>

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

export default PopupEx;
