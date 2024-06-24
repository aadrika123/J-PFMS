/**
 * Author: Krish
 * status: close
 */
"use client";
import React from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/global/atoms/buttons/Button";

type HeaderFactory = "edit" | "add" | "view" | "";
interface HeaderWidgetProps {
  title: string;
  variant: HeaderFactory;
  editVisible?: boolean | false;
  handleEditMode?: () => void;
  handlePrint?: () => void;
  handleAdd?: () => void;
  isDisabled?: boolean;
}

export function HeaderWidget(props: HeaderWidgetProps) {
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
        <Button
          onClick={props.handleAdd}
          variant="primary"
          className="rounded-3xl"
        >
          + Add {props.title}
        </Button>
      </div>
    </div>
  );

  const ViewHeader = (
    <div className="overflow-x-auto flex justify-between">
      <div className="flex items-center">
        <SubHeading className="text-2xl">View {props.title}</SubHeading>
      </div>
      <div className="flex">
        {editVisible && (
          <Link href={`${pathName.replace("view", "edit")}`}>
            <Button
              onClick={props.handleEditMode}
              variant="primary"
              disabled={props?.isDisabled}
              className={`rounded ${props?.isDisabled && "cursor-not-allowed hover:bg-opacity-55"}`}
            >
              {props?.isDisabled ? "You Can't Edit" : "Edit"}
            </Button>
          </Link>
        )}
        {/* <Button onClick={props.handlePrint} variant="primary" className="rounded ml-2">
          Print
        </Button> */}
      </div>
    </div>
  );

  const Header = (
    <div className="flex items-center">
      <SubHeading className="text-2xl">{props.title}</SubHeading>
    </div>
  );

  return (
    <div className="border bg-white shadow-xl p-4 mb-10">
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
