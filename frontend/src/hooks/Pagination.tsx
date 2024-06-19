import React, { ReactNode, useState } from "react";

export const defaultPage = 1;
export const defaultLimit = 10;

export function usePagination(): [number, number, ReactNode, () => void] {
  const [page, setPage] = useState<number>(defaultPage);
  const [limit, setLimit] = useState<number>(defaultLimit);

  const resetPaginator = () => {
    setPage(defaultPage);
    setLimit(defaultLimit);
  }

  const [pageFieldValue, setPageFieldValue] = useState<number>(defaultPage);

  const paginator = (
    <div className="flex mt-6">
      
      <div className="flex gap-2 mr-6">
      <div>
        <input
          id="pageNumberInputBox"
          type="number"
          placeholder="Go to Page "
          style={{
            border: "1px solid #cccc",
            height: "30px",
            width: "100px",
            padding: "20px",
            borderRadius: "10px",
            // marginBottom: "60px"
          }}
          defaultValue={defaultPage}
          onChange={(event) => setPageFieldValue(Number(event.target.value))}
        />
      </div>
      <div>
        <button className="flex justify-between " onClick={() => {
          if (pageFieldValue) setPage(pageFieldValue);
        }}>
          <svg
            width="38"
            height="37"
            viewBox="0 0 38 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="19.1095" cy="18.3347" r="18.155" fill="#4338CA" />
            <path
              d="M27.9822 19.5044C28.325 19.1617 28.325 18.6059 27.9822 18.2631L22.3963 12.6772C22.0535 12.3345 21.4978 12.3345 21.155 12.6772C20.8122 13.02 20.8122 13.5758 21.155 13.9185L26.1202 18.8838L21.155 23.849C20.8122 24.1918 20.8122 24.7476 21.155 25.0903C21.4978 25.4331 22.0535 25.4331 22.3963 25.0903L27.9822 19.5044ZM11.9573 19.7615H27.3615V18.0061H11.9573V19.7615Z"
              fill="white"
            />
          </svg>
        </button>
      </div>


      </div>

      
      <div>
        <select
          id="recordLimitInputBox"

          
          style={{
            border: "1px solid #cccc",
            height: "40px",
            width: "200px",
            padding: "0px",
            borderRadius: "10px",
            backgroundColor: "#ffffff",
          }}

          onChange={(event) => setLimit(Number(event.target.value))}
          defaultValue={defaultLimit}
        >
          <option value="2">Show 2</option>
          <option value="5">Show 5</option>
          <option value="10">Show 10</option>
          <option value="20">show 20</option>
          <option value="30">show 30</option>
        </select>
      </div>
    </div>
  );

  return [limit, page, paginator, resetPaginator];
}
