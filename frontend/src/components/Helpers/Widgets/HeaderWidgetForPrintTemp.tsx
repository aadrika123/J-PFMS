/**
 * Author: Krish
 * status: close
 */
"use client";
import React from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LinkWithLoader } from "@/components/global/atoms/LinkWithLoader";
import goBack from "@/utils/helper";
import Button from "@/components/global/atoms/buttons/Button";

type HeaderFactory = "edit" | "add" | "view" | "";
interface HeaderWidgetProps {
  title: string;
  variant: HeaderFactory;
  editVisible?: boolean | false;
  handleEditMode?: () => void;
  handlePrint?: () => void;
}

export function HeaderWidgetForPrintTemp(props: HeaderWidgetProps) {
  const { editVisible = false } = props;
  const pathName = usePathname();

  const EditHeader = (
    <div className="overflow-x-auto flex justify-between">
      <div className="flex items-center">
        <SubHeading className="text-2xl">Edit {props.title}</SubHeading>
      </div>
    </div>
  );

  const AddHeader = (
    <div className="overflow-x-auto flex justify-between">
      <div className="flex items-center">
        <SubHeading className="text-2xl">{props.title}</SubHeading>
      </div>
      <div className="flex">
        <LinkWithLoader href={`${pathName}/add`}>
          <Button variant="primary" className="rounded-3xl">
            + Add {props.title}
          </Button>
        </LinkWithLoader>
      </div>
    </div>
  );

  const ViewHeader = (
    <div className="overflow-x-auto flex justify-between">
      <div className="flex items-center">
        <SubHeading className="text-2xl">View {props.title}</SubHeading>
      </div>
      <div className="flex">
        <Button variant="primary" onClick={goBack} className="rounded">
          Back
        </Button>
        {editVisible && (
          <Link href={`${pathName.replace("mode=view", "mode=view")}`}>
            <Button
              onClick={props.handleEditMode}
              variant="primary"
              className="rounded"
            >
              Edit
            </Button>
          </Link>
        )}
        <Button
          onClick={props.handlePrint}
          variant="primary"
          className="rounded ml-2"
        >
          Print
        </Button>
      </div>
    </div>
  );

  const Header = (
    <div className="flex items-center">
      <SubHeading className="text-2xl">{props.title}</SubHeading>
    </div>
  );

  return (
    <div className="border shadow-xl p-4 mb-10">
      {props.variant === "edit"
        ? EditHeader
        : props.variant === "add"
          ? AddHeader
          : props.variant === "view"
            ? ViewHeader
            : Header}
    </div>
  );
}
