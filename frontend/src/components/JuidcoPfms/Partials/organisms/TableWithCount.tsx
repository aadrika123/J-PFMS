"use client";
import React, { ReactElement, ReactNode, useState } from "react";
import TotalCountTable from "../molecules/TotalCountTable";
import { useDispatch } from "react-redux";
import { openPopup } from "@/redux/reducers/PopupReducers";
import Table from "@/components/global/molecules/Table";
import goBack from "@/utils/helper";
import Popup from "@/components/global/molecules/Popup";
import LosingDataConfirm from "@/components/global/molecules/LosingDataConfirm";
import Button from "@/components/global/atoms/buttons/Button";

export interface ColumnProps {
  name: string;
  caption: string | ReactElement;
  value?: (id: string) => ReactNode;
  color?: string;
  width?: string;
}

type FooterData = {
  key: string;
  value: number;
};

interface TableHOCProps<T> {
  columns: Array<ColumnProps>;
  data?: T[];
  center?: boolean;
  scrollable?: boolean;
  height?: string;
  title: string;
  footerData?: FooterData[];
  handleStore: (data: T[] | undefined) => void;
  handleResetTable: () => void;
  handleAddNewEntery?: () => void;
}

const TableWithCount: React.FC<TableHOCProps<unknown>> = (props) => {
  const [showPopup, setShowPopup] = useState({
    isOpen: false,
    state: "",
  });
  const { isOpen, state } = showPopup;
  const dispatch = useDispatch();
  const handleClick = () => {
    if (props.handleAddNewEntery) {
      props.handleAddNewEntery();
    }
    dispatch(openPopup());
  };

  const handleConfirmButton = (state?: string) => {
    setShowPopup((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
      state: state || "",
    }));
  };

  return (
    <>
      {isOpen && (
        <Popup width="30%" title="" >
          <LosingDataConfirm
            cancel={handleConfirmButton}
            continue={state === "back" ? goBack : props.handleResetTable}
          />
        </Popup>
      )}
      <section className="border shadow-lg bg-white p-6 px-10">
        <div className="flex justify-between items-center mb-2">
          <div className="text-secondary text-sub_head font-semibold">
            {props.title}
          </div>
          <Button onClick={handleClick} buttontype="button" variant="primary">
            Add New Entry
          </Button>
        </div>
        <Table {...props} />
        {props.footerData && props.footerData.length > 0 && (
          <TotalCountTable footerData={props.footerData} />
        )}
        <aside className="flex items-center justify-end py-5 gap-5">
          <Button
            onClick={() =>
              props.data && props.data.length > 0
                ? handleConfirmButton("back")
                : goBack()
            }
            buttontype="button"
            variant="cancel"
          >
            Back
          </Button>
          {props.data && props.data.length > 0 && (
            <>
              <Button
                onClick={() => handleConfirmButton("reset")}
                buttontype="button"
                variant="cancel"
              >
                Reset
              </Button>
              <Button
                onClick={() => props.handleStore(props.data)}
                buttontype="button"
                variant="primary"
              >
                Submit
              </Button>
            </>
          )}
        </aside>
      </section>
    </>
  );
};

export default TableWithCount;
