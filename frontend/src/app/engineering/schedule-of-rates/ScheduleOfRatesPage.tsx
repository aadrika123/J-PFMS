"use client"

import Button from "@/components/global/atoms/buttons/Button";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode, useState } from "react";


import list from "@/assets/svg/list.svg";
import details from "@/assets/svg/details.svg";

import { Icons } from "@/assets/svg/icons";




import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { FilterButton } from "@/components/global/atoms/FilterButton";
import SearchPanel from "@/components/global/molecules/SearchPanel";
import { usePagination } from "@/hooks/Pagination";

import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";


import qs from "qs";
import goBack from "@/utils/helper";



const usePrimaryTabs = (defaultTabIndex: number, changeAllowed: boolean): [ReactNode, number, (index: number) => void] => {

    const items = [
        { caption: "List", icon: list },
        { caption: "Details", icon: details },
    ];

    const [activeTabIndex, setActiveTabIndex] = useState<number>(defaultTabIndex);

    const tabs = (
        <div className="flex">

            {items.map((item, index) => {
                return (
                    <>
                        <div onClick={() => { if (changeAllowed) setActiveTabIndex(index); }} className={`flex items-center  pb-1 w-28 justify-center ${activeTabIndex == index ? 'border-b-2 border-b-black' : ''}`}>
                            {item.icon && <Image src={item.icon} height={20} width={20} alt="pro-1" />}
                            <span className="ml-2 text-gray-500">{item.caption}</span>
                        </div>
                    </>
                );
            })}
        </div>

    );

    return [tabs, activeTabIndex, setActiveTabIndex]
}


const ScheduleOfRates = () => {
    const router = useRouter();
    const currentPath = usePathname();

    const [primaryTabs, activePrimaryTabIndex, setActivePrimaryTabIndex] = usePrimaryTabs(0, false);



    const [searchQuery, setSearchQuery] = useState<string>("");
    const [limit, page, paginator, resetPaginator] = usePagination();



    const [searchPanelItemValues, setSearchPanelItemValues] = useState<any>({});

    const [workingAnimation, activateWorkingAnimation] = useWorkingAnimation();


    const [isFilterPanelOpen, setFilterPanelOpen] = useState(false);
    const toggleFilterPanel = () => {
        setFilterPanelOpen((prevState) => !prevState);
    }


    const addSOR = () => {
        router.push(`${currentPath}/add`);
    }

    const searchPanelItems = [
        { name: "project_proposal_no", caption: "Project Proposal Number" },
        { name: "ulb_name", caption: 'Ulb Name' }
    ];




    const onFilterChange = (filters: any) => {
        // console.log("Filters updated: ", filters);
        const q = qs.stringify(filters);
        setSearchQuery(q);
        resetPaginator();
    }

    const onRemoveFilter = () => {
        console.log("Filters removed!");
        setSearchQuery("");
        resetPaginator();
    }

    const onViewButtonClick = (id: number) => {
        activateWorkingAnimation();
        router.push(`${currentPath}/view/${id}?mode=view`);
    };

    return (
        <>
            {workingAnimation}

            <div className="flex items-center justify-between border-b-2 pb-4 mb-4">
                <Button
                    variant="cancel"
                    className="border-none text-primary_bg_indigo hover:text-primary_bg_indigo hover:bg-inherit"
                    onClick={goBack}
                >
                    {Icons.back}
                    <b>Back</b>
                </Button>

                <Button variant="primary" onClick={addSOR}>Add SOR</Button>


            </div>

            <div className="flex items-center mb-4 justify-between">
                {primaryTabs}

                {activePrimaryTabIndex == 0 && (<div className="flex flex-col justify-center">
                    <FilterButton onClick={toggleFilterPanel} active={isFilterPanelOpen} />
                </div>)}
            </div>

            {activePrimaryTabIndex == 0 && (
                <>


                    <div hidden={!isFilterPanelOpen} className="w-[25%] h-[75vh] overflow-y-auto overflow-x-hidden hide-scrollbar">
                        <SearchPanel onClose={toggleFilterPanel} items={searchPanelItems} values={searchPanelItemValues} onFilterChange={onFilterChange} onNoFilter={onRemoveFilter} />
                    </div>


                    <div className={isFilterPanelOpen ? 'w-[75%]' : 'w-[98%]'}>
                        <section className="border bg-white shadow-xl p-6 px-10">

                            Total Results: { }

                            <div className="border-2 p-2 rounded">
                                <Tabs>
                                    <TabList>
                                        <Tab>VIEW DETAILS</Tab>
                                        <Tab>VIEW DOCUMENTS</Tab>
                                        <Tab>ACTIONS</Tab>
                                    </TabList>

                                    <TabPanel>

                                        Existing SOR Table

                                    </TabPanel>

                                    <TabPanel >


                                        <div className="border p-2 min-h-[500px]">
                                            Full Details of a single SOR record
                                        </div>

                                    </TabPanel>

                                </Tabs>
                            </div>

                        </section>
                    </div>

                </>



            )}





        </>
    );
}

export default ScheduleOfRates;