"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "@/lib/axiosConfig";
import Loader from "@/components/global/atoms/Loader";
import dynamic from "next/dynamic";
const LineChart = dynamic(() => import("../Dashboard/LineChart"), {
  ssr: false,
});

import moment from "moment";
const BearAnimation = dynamic(() => import("./LogAnimation").then(module => ({default: module.BearAnimation} )), {
  ssr: false,
});
const EmojiAnimation = dynamic(() => import("./LogAnimation").then(module => ({default: module.EmojiAnimation} )), {
  ssr: false,
});
const CelebrationAnimation = dynamic(() => import("./LogAnimation").then(module => ({default: module.CelebrationAnimation} )), {
  ssr: false,
});

interface LogCardsProps {
  data: any;
}

interface stateProps {
  logs: [];
  page: number;
  limit: number;
  detailedData: any;
  graphData: [];
  graphCateg: [];
  date: any;
}

const HeroLogsPage = () => {
  const [state, setState] = useState<stateProps>({
    logs: [],
    page: 1,
    limit: 10,
    detailedData: null,
    graphData: [],
    graphCateg: [],
    date: undefined,
  });

  const { logs, page, limit, detailedData, graphData, graphCateg, date } =
    state;

  const fetchData = async () => {
    try {
      const res = await axios({
        url: `/audit-trails/get?limit=${limit}&page=${page}&date=${date}`,
        method: "GET",
      });

      if (res.data.status) {
        res && setState((prev) => ({ ...prev, logs: res.data.data }));
      } else {
        throw "Something Went Wrong!!";
      }
    } catch (error) {
      console.log(error);
    }
  };

  const {
    isFetching,
    isError,
    refetch: refetchData,
  } = useQuery([page], fetchData);
  useEffect(() => {
    refetchData();
  }, [date]);

  if (isError) {
    console.log(isError);
  }

  ///////////////// Get Graph Data //////////////////
  const getGraphData = async () => {
    try {
      const res = await axios({
        url: `/audit-trails/report/get`,
        method: "GET",
      });

      if (res.data.status) {
        const d: any = [];
      const categ: any = [];
      res.data.data.forEach((item: { month: string; total_logs: number }) => {
        categ.push(item.month);
        d.push(item.total_logs);
      });

      setState((prev) => ({ ...prev, graphData: d, graphCateg: categ }));
      }
      throw "Something Went Wrong!!";
    } catch (error) {
      console.log(error);
    }
  };

  useQuery(["graph"], getGraphData);

  const handleClick = (data: any) => {
    setState((prev) => ({ ...prev, detailedData: data }));
  };

  //////////////////// Line Chart options /////////////
  const options: any = {
    series: [
      {
        name: "Series A",
        data: graphData,
      },
    ],
    xaxis: {
      categories: graphCateg,
    },
    yaxis: {
      categories: [10, 20, 30, 40],
    },
    chart: {
      toolbar: {
        show: false, // Hides the toolbar
      },
    },
  };

  return (
    <div className="max-w-screen overflow-hidden h-screen">
      <div className="m-4">
        <div className="shadow-xl border p-4 text-secondary_black font-bold flex">
          <div className="flex-1">
            <span>List of Top 10 Logs</span>
            <input
              type="date"
              className="bg-transparent border ml-4"
              onChange={(e) =>
                setState((prev) => ({ ...prev, date: e.target.value }))
              }
            />
          </div>
          {!detailedData && <div className="flex-1 ml-4">Graph of 6 month</div>}
        </div>
        {!isFetching ? (
          logs.length > 0 ? (
            <div className="flex mt-4">
              <div className="flex-1">
                <div
                  style={{ height: "calc(100vh - 100px" }}
                  className="flex flex-col gap-2 hide-scrollbar flex-1 overflow-auto"
                >
                  {logs.map((item: any, index: number) => (
                    <div key={index} onClick={() => handleClick(item)}>
                      <div
                        className={`${detailedData?.id === item?.id && "bg-red-500"}`}
                      >
                        <LogCards data={item} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                style={{ height: "calc(100vh - 100px" }}
                className="hide-scrollbar flex-1 ml-4 w-1/2  overflow-auto"
              >
                {detailedData ? (
                  <RightSide data={detailedData} />
                ) : (
                  <>
                    <div>
                      {graphCateg.length > 0 && (
                        <LineChart
                          title="Total Logs"
                          width={"100%"}
                          options={options}
                        />
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div
              style={{ height: "calc(100vh - 150px)" }}
              className="flex justify-center items-center relative text-secondary_black font-bold text-2xl"
            >
              <span className="absolute top-6 flex items-center">
                <EmojiAnimation /> No Errors Found <EmojiAnimation />
              </span>
              <div className="absolute top-0">
                <CelebrationAnimation />
              </div>
              <div className="absolute top-36">
                <BearAnimation />
              </div>
            </div>
          )
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default HeroLogsPage;

/////////////////////// Cards /////////////////////////////
const LogCards: React.FC<LogCardsProps> = (props) => {
  const { id, meta_data, error, message, created_at } = props.data;
  return (
    <div className="shadow-lg border flex flex-col p-2 text-sm cursor-pointer">
      <div className="flex items-center justify-between">
        <span>
          <b className="font-semibold text-secondary_black">id: </b>
          {id}
        </span>
        <span>
          <b className="font-semibold text-secondary_black">apiId: </b>
          {meta_data?.apiId}
        </span>
        <span>
          <b className="font-semibold text-secondary_black">action: </b>
          {meta_data?.action}
        </span>
        <span>
          <b className="font-semibold text-secondary_black">date: </b>
          {moment(created_at).format("YYYY-MM-DD")}
        </span>
      </div>
      <span>
        <b className="font-semibold text-secondary_black">error-message: </b>
        {message || "null"}
      </span>
      <span>
        <b className="font-semibold text-secondary_black">error: </b>
        {error}
      </span>
    </div>
  );
};

///////////////////////////// Right //////////////////

const RightSide: React.FC<LogCardsProps> = (props) => {
  const replacer = (key: string, value: any) => {
    if (key === "user") {
      return value.user;
    }
    return value;
  };

  return <pre>{JSON.stringify(props.data, replacer, 2)}</pre>;
};
