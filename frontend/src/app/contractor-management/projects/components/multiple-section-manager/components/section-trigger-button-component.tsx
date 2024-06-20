import React from "react";
import Button from "@/components/global/atoms/buttons/Button";
import Link from "next/link";
import { Icons } from "@/assets/svg/icons";
import { LoadingCircleSmall } from "@/components/global/atoms/loading-circles";
import { defaultLimit, defaultPage } from "@/hooks/Pagination";
import { usePathname } from "next/navigation";
import { UseQueryResult } from "react-query";



interface SectionTriggerButtonProps {
    encodedSectionName: string;
    title: string;
    currentSectionName: string;
    queryHook: (searchQuery: string, limit: number, page: number) => UseQueryResult<any>
}


export const SectionTriggerButton = ({ encodedSectionName, title, currentSectionName, queryHook}: SectionTriggerButtonProps) => {
    const pathName = usePathname();
    const { data: data } = queryHook("", defaultLimit, defaultPage);

    return (
        <Link href={pathName + `?section=${encodedSectionName}`}>
            <Button
                variant="primary"
                className={currentSectionName == encodedSectionName ? "" : "bg-gray-200 text-gray-500"}
            >
                {Icons.outbox}
                {title}

                {data ? (
                    <div className="badge badge-secondary">
                        {data?.count}
                    </div>
                ) : (
                    <LoadingCircleSmall />
                )}

            </Button>
        </Link>

    );
}
