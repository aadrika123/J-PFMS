import {useSearchParams } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { UseQueryResult } from "react-query";
import { SectionTriggerButton } from "./components/section-trigger-button-component";


const changeName = (name: string): string => {
    return name.toLowerCase().replaceAll(' ', '_');
}


interface PageSection {
    title: string;
    component: ReactNode,
    queryHook: (searchQuery: string, limit: number, page: number) => UseQueryResult<any>
}


interface MultipleSectionManagerComponentProps {
    sections: PageSection[]
}

export default function MultipleSectionManagerComponent({ sections }: MultipleSectionManagerComponentProps) {
    
    const searchParams = useSearchParams();
    const [currentSectionName, setCurrentSectionName] = useState<string>("inbox");
    const [currentSection, setCurrentSection] = useState<ReactNode>(<></>);

    useEffect(() => {
        const sectionName = searchParams.get('section');
        if (sectionName) setCurrentSectionName(sectionName);
      }, [searchParams]);


    useEffect(() => {
        sections.forEach((section) => {
            if (changeName(section.title) == currentSectionName) {
                setCurrentSection(section.component);
            }
        })
    }, [currentSectionName]);


    return (
        <>
            <div className="flex items-center mb-2 gap-2">
                {sections.map((section, index: number) => {
                    const encodedSectionName = changeName(section.title);

                    return <SectionTriggerButton
                        key={index}
                        currentSectionName={currentSectionName}
                        title={section.title}
                        encodedSectionName={encodedSectionName}
                        queryHook={section.queryHook}
                    />
                })}
            </div>


            {currentSection}
        </>

    );
}