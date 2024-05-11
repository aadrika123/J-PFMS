"use client";
import Button from "@/components/global/atoms/buttons/Button";
import Table from "@/components/global/molecules/Table";
// const Table = lazy(()=> import("@/components/global/molecules/Table"));
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import HomeHeader from "./Header";
import HomeCard, { RactangleCard } from "./Card";
import AllHomeButtons from "./AllButtons";
import { useQuery } from "react-query";
import { PFMS_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import LoaderSkeleton from "@/components/global/atoms/LoaderSkeleton";
import { useSelector } from "react-redux";

type stateProps = {
  moduleId: number | null;
  page: number;
  limit: number;
};

const Home = () => {
  const router = useRouter();
  const [state, setState] = useState<stateProps>({
    moduleId: null,
    page: 1,
    limit: 10,
  });
  const { moduleId, page, limit } = state;
  const user = useSelector((state: any) => state.user.user?.userDetails);

  const fetchData = async () => {
    try {
      const res = await axios({
        url: `${PFMS_URL.RECEIPT_REGISTER.get}?limit=${limit}&page=${page}&order=-1&date=${new Date().toISOString().split("T")[0]}&module=${moduleId}&ulb=${user?.user_type === "Admin" ? undefined : user?.ulb_id}`,
        method: "GET",
      });

      if (!res.data.status) {
        throw "Something Went Wrong!!";
      }

      let data = res.data?.data;
      if (data == null) {
        data = { totalPage: 0, data: [] };
      }

      return data;
    } catch (error) {
      console.log("error");
    }
  };

  const {
    isError: fetchingError,
    isFetching: isFetching,
    data: data,
  }: any = useQuery(["receipts", moduleId, page, limit], fetchData);

  if (fetchingError) {
    console.log(fetchingError);
  }

  //////// Table View Button Feature //////////
  const onViewButtonClick1 = (id: string) => {
    router.push(`/revenue-collection/receipt-register/view/${id}?mode=view`);
  };

  /////// Handling Module Click
  const handleClick = (id: number) => {
    if (moduleId === id) {
      setState({ ...state, moduleId: null });
    } else {
      setState({ ...state, moduleId: id });
    }
  };

  const tButton = (id: string) => {
    return (
      <>
        <Button
          variant="primary"
          className="py-2 px-4"
          onClick={() => onViewButtonClick1(id)}
        >
          View
        </Button>
      </>
    );
  };

  const columns = [
    { name: "id", caption: "Sr. No.", width: "w-[10%]" },
    {
      name: "receipt_no",
      caption: "Receipt Number",
      width: "w-[25%]",
    },
    {
      name: "paid_by",
      caption: "Paid By",
      width: "w-[25%]",
    },
    {
      name: "revenue_module",
      caption: "Revenue Module",
      width: "w-[25%]",
    },
    {
      name: "receipt_date",
      caption: "Receipt Date",
      width: "w-[25%]",
    },
    {
      name: "view",
      caption: "View",
      width: "w-[10%]",
      value: tButton,
    },
  ];
  return (
    <div>
      <h1 className="flex items-center justify-end text-secondary_black font-bold mb-2">
        Home
      </h1>
      <HomeHeader />
      <div className="flex items-center justify-between flex-wrap my-6 gap-5 max-md:justify-center">
        <HomeCard
          color="green"
          title="Number of Receipts"
          total={data?.count || 0}
        />
        <HomeCard color="blue" title="Number of Payments" total={0} />
        <RactangleCard title="Receipt Register" />
      </div>
      <h1 className="text-sm"># Summary of Revenue</h1>
      <AllHomeButtons moduleId={moduleId} handleClick={handleClick} />
      <div className="shadow-lg mb-6 mt-4">
        {isFetching ? (
          <LoaderSkeleton />
        ) : (
          <Table center columns={columns} data={data?.data} />
        )}
      </div>
    </div>
  );
};

export default Home;
