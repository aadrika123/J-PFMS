import React, { useEffect, useState } from "react";
import SimpleTable, { ColumnProps } from "../atoms/SimpleTable";
import DebouncedSearchBox from "../atoms/DebouncedSearchBox";
import NextButton from "../atoms/NextButton";
import PrevButton from "../atoms/PrevButton";
import axios from "axios";
import { useQuery } from "react-query";
import Loader from "../atoms/Loader";



/**
 * | Author- Bijoy Paitandi
 * | Created On- 02-02-2024
 * | Created for- Reusable Record List With Search
 * | Status: open
 */


interface TableWithSearchProps{
    title: string;
    columns: Array<ColumnProps>;
    onViewButtonClick: (id: number) => void;
    api: string;
    numberOfRowsPerPage: number;
}


const TableWithSearch = <T, >({title, columns, onViewButtonClick, api, numberOfRowsPerPage}: TableWithSearchProps) => {
    const [page, setPage] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number>(0);
    const [searchText, setSearchText] = useState<string>("");
    const [data, setData] = useState<T[]>([]);

    const fetchData = async (): Promise<T[]> => {
      const res = await axios({
        url: `${api}?search=${searchText}&limit=${numberOfRowsPerPage}&page=${page}`,
        method: "GET",
      });
  
      let data = res.data?.data;
  
      if (data == null) {
        data = { totalPage: 0, data: [] };
      }
  
      console.log(data);
  
      setPageCount(data.totalPage);
      setData(data?.data);
      return data?.data;
    };


    const {
      isError: fetchingError,
      isLoading: isFetching,
      refetch: refetchData,
    } = useQuery([page, searchText], fetchData);
  
    if (fetchingError) {
      console.log(fetchingError);
      // throw new Error("Fatal Error!");
    }
    

    useEffect(() => {
      refetchData();
    }, [page, searchText]);

    const handlePageChange = (direction: "prev" | "next") => {
      const newPageNumber = direction === "prev" ? page - 1 : page + 1;
      if (newPageNumber > 0 && newPageNumber <= pageCount) {
        setPage(newPageNumber);
      }
    };

    const onSearchTextChange = (text: string) => {
        setSearchText(text);
        setPage(1);
    }

    
    
    return (
        <>
        <section className="border rounded-lg border-zinc-300 p-6 px-10">


        <div className="flex justify-between">
          <div className="text-secondary text-sub_head font-semibold">{title}</div>
          <DebouncedSearchBox onChange={onSearchTextChange}/>
        </div>

    

        <div className="mt-8">
          {isFetching ? (<Loader/>) : (
            <>
            <SimpleTable columns={columns} data={data} onViewButtonClick={onViewButtonClick}/>

            <div className="flex items-center justify-between mt-5 gap-5">
              <div>Showing {page} out of {pageCount} pages</div>
              <div className="flex items-center justify-end mt-5 gap-5">
                
                {page > 1 && (
                  <PrevButton onClick={() => handlePageChange("prev")} />
                )}

                {page < pageCount && (
                  <NextButton onClick={() => handlePageChange("next")} />
                )}
              
              </div>
            </div>
            </>
          )}
          
        </div>

        </section>
        </>
    );
}

export default TableWithSearch;