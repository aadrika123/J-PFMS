"use client";

import React, { useEffect, useState } from "react";
import axios from "@/lib/axiosConfig";
import { useQuery } from "react-query";
import DebouncedSearch from "../atoms/DebouncedSearch";
import Table, { ColumnProps } from "../molecules/Table";
import NextPrevPagination from "../molecules/NextPrevPagination";
import LoaderSkeleton from "../atoms/LoaderSkeleton";



/**
 * | Author- Bijoy Paitandi
 * | Created On- 02-02-2024
 * | Created for- Reusable Record List With Search
 * | Status: open
 */

interface TableWithFeaturesProps {
  title: string;
  columns: Array<ColumnProps>;
  api: string;
  numberOfRowsPerPage: number;
  value?: () => void;
  center?: boolean;
}

interface stateTypes<T> {
  page: number;
  pageCount: number;
  searchText: string;
  data: T[];
}

const TableWithFeatures = <T,>({
  title,
  columns,
  api,
  numberOfRowsPerPage,
  center = false,
}: TableWithFeaturesProps) => {
  const [isSearching, setIsSearching] = useState(false);
  const [state, setState] = useState<stateTypes<T>>({
    page: 1,
    pageCount: 0,
    searchText: "",
    data: [],
  });
  const { page, pageCount, searchText, data} = state;

  const fetchData = async (): Promise<T[]> => {
    const res = await axios({
      url: `${api}?search=${searchText}&limit=${numberOfRowsPerPage}&page=${page}&order=-1`,
      method: "GET",
    });

    let data = res.data?.data;
    if (data == null) {
      data = { totalPage: 0, data: [] };
    }

    // data = data.data.sort(sortByCreatedAtDesc);
    setState((prev) => ({
      ...prev,
      pageCount: data.totalPage,
      data: data.data,
    }));

    setIsSearching(false);
    return data.data;
  };

  const {
    isError: fetchingError,
    isLoading: isFetching,
    refetch: refetchData,
  } = useQuery([page, searchText], fetchData);

  if (fetchingError) {
    console.log(fetchingError);
  }

  useEffect(() => {
    setIsSearching(true);
    refetchData();
  }, [page, searchText]);

  const handlePageChange = (direction: "prev" | "next") => {
    const newPageNumber = direction === "prev" ? page - 1 : page + 1;
    if (newPageNumber > 0 && newPageNumber <= pageCount) {
      setState((prev) => ({ ...prev, page: newPageNumber }));
    }
  };

  const onSearchTextChange = (text: string) => {
    setState((prev) => ({ ...prev, searchText: text, page: 1 }));
  };

  return (
    <>
      <section className="border bg-white shadow-xl p-6 px-10">
        <div className="flex justify-between items-center">
          <div className="text-secondary text-sub_head font-semibold">
            {title}
          </div>
          <DebouncedSearch onChange={onSearchTextChange} />
        </div>

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
              // scrollable
              />
              <NextPrevPagination
                page={page}
                pageCount={pageCount}
                handlePageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default TableWithFeatures;
