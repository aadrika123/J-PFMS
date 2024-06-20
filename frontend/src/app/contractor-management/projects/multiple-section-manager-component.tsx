import { usePathname, useSearchParams } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import Button from "@/components/global/atoms/buttons/Button";
import Link from "next/link";
import { Icons } from "@/assets/svg/icons";
import { LoadingCircleSmall } from "@/components/global/atoms/loading-circles";


const changeName = (name: string): string => {
    return name.toLowerCase().replaceAll(' ', '_');
}


interface PageSection {
    title: string;
    count: number;
    component: ReactNode
}


interface MultipleSectionManagerComponentProps {
    sections: PageSection[]
}




export default function MultipleSectionManagerComponent({ sections }: MultipleSectionManagerComponentProps) {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const [currentSectionName, setCurrentSectionName] = useState<string>("inbox");
    const [currentSection, setCurrentSection] = useState<ReactNode>(<></>);


    useEffect(() => {
        const sectionName = searchParams.get("section");
        setCurrentSectionName(sectionName ? sectionName : "");
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
                    return (
                        <Link href={pathName + `?section=${encodedSectionName}`} key={index}>
                            <Button
                                variant="primary"
                                className={currentSectionName == encodedSectionName ? "" : "bg-gray-200 text-gray-500"}
                            >
                                {Icons.outbox}
                                {section.title}

                                {section.count != -1 ? (
                                    <div className="badge badge-secondary">
                                        {section.count}
                                    </div>
                                ) : (
                                    <LoadingCircleSmall />
                                )}

                            </Button>
                        </Link>

                    )
                })}
            </div>
            {currentSection}
        </>

    );
}