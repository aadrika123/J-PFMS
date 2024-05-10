"use client";

import React, { useEffect, useState } from "react";
import axios from "@/lib/axiosConfig";
import { useQuery } from "react-query";
import Table, { ColumnProps } from "@/components/global/molecules/Table";
// import DebouncedSearch from "@/components/global/atoms/DebouncedSearch";
import LoaderSkeleton from "@/components/global/atoms/LoaderSkeleton";
import NextPrevPagination from "@/components/global/molecules/NextPrevPagination";
// import Select from "@/components/global/atoms/nonFormik/Select";
// import { PFMS_URL } from "@/utils/api/urls";
// import Input from "@/components/global/atoms/Input";
import { useUser } from "@/components/global/molecules/general/useUser";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 16-04-2024
 * | Created for- Showing the list
 * | Status: open
 */

interface TableWithFeaturesProps {
  columns: Array<ColumnProps>;
  api: string;
  numberOfRowsPerPage: number;
  value?: () => void;
  center?: boolean;
  scrollable?: boolean;
  handleGet?: (data: any) => void;
  handleApprove?: () => void;
}

interface stateTypes {
  page: number;
  pageCount: number;
  searchText: string;
  ulbId: number | string;
  bill_no: string;
}

const TableWithFeatures = <T,>({
  columns,
  api,
  numberOfRowsPerPage,
  center = false,
}: TableWithFeaturesProps) => {
  const user = useUser()
  const [isSearching, setIsSearching] = useState(false);
  const [state, setState] = useState<stateTypes>({
    page: 1,
    pageCount: 0,
    searchText: "",
    ulbId: 0,
    bill_no: ""
  });
  const { page, pageCount, searchText, ulbId, bill_no } = state;

  ///////// Setting ULB Id 
  useEffect(() => {
    setState((prev) => ({...prev, ulbId: user?.getUlbId()}))
  },[user])

  const fetchData = async (): Promise<T[]> => {
    const res = await axios({
      url: `${api}?search=${searchText}&limit=${numberOfRowsPerPage}&page=${page}&order=-1&ulbId=${ulbId}&bill_no=${bill_no}`,
      method: "GET",
    });

    let data = res.data?.data;
    if (data == null) {
      data = { totalPage: 0, data: [] };
    }
    setState({...state, pageCount: data.totalPage})

    setIsSearching(false);
    return data.data;
  };

  const {
    isError: fetchingError,
    isLoading: isFetching,
    data: data,
  } = useQuery([api, page, searchText, ulbId, bill_no], fetchData);

  if (fetchingError) {
    console.log(fetchingError);
  }


  const handlePageChange = (direction: "prev" | "next") => {
    const newPageNumber = direction === "prev" ? page - 1 : page + 1;
    if (newPageNumber > 0 && newPageNumber <= pageCount) {
      setState((prev) => ({...prev, page: newPageNumber}))
    }
  };

  // const onSearchTextChange = (text: string) => {
  //   setState((prev) => ({...prev, searchText: text, page: 1}))
  // };

  // ////// Handl Selecting ULBs ///////////
  // const handleUlb = (e: ChangeEvent<HTMLSelectElement>) => {
  //   setState((prev) => ({...prev, ulbId: e.target.value}))
  // };

  // ////// Handl Selecting Date ///////////
  // const handleBill = (e: ChangeEvent<HTMLInputElement>) => {
  //   setState((prev) => ({...prev, bill_no: e.target.value}))
  // };

  // ///// Getting the first selected value
  // const initUlbHandler = (value: number) => {
  //   setState((prev) => ({...prev, ulbId: value}))
  // };
  
  return (
    <>
      {/* <div className="flex justify-between items-end">
        <div className="text-primary_bg_indigo rounded-md px-2 pb-1 text-sub_head font-semibold flex items-center">
          <Select
            label="ULB"
            name="ulb_id"
            className="w-48 text-primary_bg_indigo border-[#4338ca] mr-4"
            api={`${PFMS_URL.MUNICIPILATY_CODE_URL.get}`}
            value={ulbId}
            onChange={handleUlb}
            readonly={!user?.isUserAdmin()}
            // initHandler={initUlbHandler}
          />
          <Input
            label="Bill number"
            name="bill-number"
            placeholder="Type here..."
            onChange={handleBill}
          />
        </div>
        <DebouncedSearch onChange={onSearchTextChange} />
      </div> */}

      <div className="mt-8">
        {isFetching || isSearching ? (
          <LoaderSkeleton />
        ) : (
          <>
            <Table
              columns={columns}
              data={data}
              center={center}
              pageNo={page}
              limit={numberOfRowsPerPage}
            />
            <NextPrevPagination
              page={page}
              pageCount={pageCount}
              handlePageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </>
  );
};

export default TableWithFeatures;
