import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import listSVG from "@/assets/svg/list.svg";
import detailsSVG from "@/assets/svg/details.svg";



interface ViewModeSelectionButtonsProps {
    currentViewMode: string;
}

export const ViewModeSelectionButtons = ({currentViewMode}: ViewModeSelectionButtonsProps) => {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    

    return (
        <div className="flex">

            <Link href={pathName + `?section=${searchParams.get('section') ? searchParams.get('section') : "inbox"}&viewMode=list`}>
                <div
                    className={currentViewMode === "list" ? `flex items-center  mr-3 pb-1 w-20 justify-center border-b-2 border-b-black` :
                        `flex items-center  pb-1 w-28 justify-center`
                    }
                >
                    <Image src={listSVG} height={20} width={20} alt="pro-1" />
                    <span className="ml-2 text-gray-500">List</span>
                </div>
            </Link>


            <div className={currentViewMode === "details" ? `flex items-center  mr-3 pb-1 w-20 justify-center border-b-2 border-b-black` :
                `flex items-center  pb-1 w-28 justify-center`
            }>
                <Image src={detailsSVG} height={20} width={20} alt="pro-1" />
                <span className="ml-2 text-gray-500">Details</span>
            </div>
        </div>


    );
}
