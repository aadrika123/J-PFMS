import React from "react";
import Button from "@/components/global/atoms/buttons/Button";
import goBack from "@/utils/helper";
import { Icons } from "@/assets/svg/icons";


interface HeaderWithTitleAndBackButtonProps {
    title: string
}


export default function HeaderWithTitleAndBackButton({title}: HeaderWithTitleAndBackButtonProps) {
    return (
        <div className="flex items-center justify-between border-b-2 pb-4 mb-4">
            <Button
                variant="cancel"
                className="border-none text-primary_bg_indigo hover:text-primary_bg_indigo hover:bg-inherit"
                onClick={goBack}
            >
                {Icons.back}
                <b>Back</b>
            </Button>
            <h2 className="text-black">
                <b>{title}</b>
            </h2>
        </div>
    );
}