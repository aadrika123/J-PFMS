"use client"
import React, { useState } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Popover, TextField } from "@mui/material";
import { useRouter } from "next/navigation"; 
import list from "@/assets/svg/list.svg";
import Image from "next/image";

const tableData = [
  {
    id: 1,
    projectTitle: "Building a Bridge",
    projectNumber: "PRJ001",
    projectBudget: "$100,000",
    utilizedBudget: "$50,000",
    remainingBudget: "$50,000",
    status: "In Progress",
    views: 100
  },
  {
    id: 2,
    projectTitle: "Renovating Office Spaces",
    projectNumber: "PRJ002",
    projectBudget: "$150,000",
    utilizedBudget: "$100,000",
    remainingBudget: "$50,000",
    status: "Completed",
    views: 200
  },
  {
    id: 3,
    projectTitle: "Constructing a Hospital",
    projectNumber: "PRJ003",
    projectBudget: "$200,000",
    utilizedBudget: "$120,000",
    remainingBudget: "$80,000",
    status: "In Progress",
    views: 150
  },
  {
    id: 4,
    projectTitle: "Designing a Website",
    projectNumber: "PRJ004",
    projectBudget: "$50,000",
    utilizedBudget: "$30,000",
    remainingBudget: "$20,000",
    status: "In Progress",
    views: 120
  },
  {
    id: 5,
    projectTitle: "Constructing a Mall",
    projectNumber: "PRJ005",
    projectBudget: "$500,000",
    utilizedBudget: "$300,000",
    remainingBudget: "$200,000",
    status: "In Progress",
    views: 180
  },
  {
    id: 6,
    projectTitle: "Building a School",
    projectNumber: "PRJ006",
    projectBudget: "$400,000",
    utilizedBudget: "$200,000",
    remainingBudget: "$200,000",
    status: "Completed",
    views: 250
  },
  {
    id: 7,
    projectTitle: "Constructing a Stadium",
    projectNumber: "PRJ007",
    projectBudget: "$1,000,000",
    utilizedBudget: "$800,000",
    remainingBudget: "$200,000",
    status: "In Progress",
    views: 300
  },
  {
    id: 8,
    projectTitle: "Developing a Mobile App",
    projectNumber: "PRJ008",
    projectBudget: "$200,000",
    utilizedBudget: "$150,000",
    remainingBudget: "$50,000",
    status: "Completed",
    views: 220
  },
  {
    id: 9,
    projectTitle: "Renovating a Library",
    projectNumber: "PRJ009",
    projectBudget: "$80,000",
    utilizedBudget: "$60,000",
    remainingBudget: "$20,000",
    status: "In Progress",
    views: 90
  },
  {
    id: 10,
    projectTitle: "Building a Park",
    projectNumber: "PRJ010",
    projectBudget: "$150,000",
    utilizedBudget: "$100,000",
    remainingBudget: "$50,000",
    status: "Completed",
    views: 200
  },
  {
    id: 11,
    projectTitle: "Constructing a Bridge",
    projectNumber: "PRJ011",
    projectBudget: "$300,000",
    utilizedBudget: "$200,000",
    remainingBudget: "$100,000",
    status: "In Progress",
    views: 150
  },
  {
    id: 12,
    projectTitle: "Designing a Shopping Mall",
    projectNumber: "PRJ012",
    projectBudget: "$600,000",
    utilizedBudget: "$400,000",
    remainingBudget: "$200,000",
    status: "In Progress",
    views: 180
  },
  {
    id: 13,
    projectTitle: "Building a Hotel",
    projectNumber: "PRJ013",
    projectBudget: "$700,000",
    utilizedBudget: "$500,000",
    remainingBudget: "$200,000",
    status: "In Progress",
    views: 190
  },
  {
    id: 14,
    projectTitle: "Constructing an Airport",
    projectNumber: "PRJ014",
    projectBudget: "$2,000,000",
    utilizedBudget: "$1,500,000",
    remainingBudget: "$500,000",
    status: "In Progress",
    views: 300
  },
  {
    id: 15,
    projectTitle: "Developing a Software",
    projectNumber: "PRJ015",
    projectBudget: "$400,000",
    utilizedBudget: "$300,000",
    remainingBudget: "$100,000",
    status: "Completed",
    views: 250
  }
];

export default function ViewTable() {
  const router = useRouter();
  const [filterCriteria, setFilterCriteria] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleAddMeasurementClick = () => {
    router.push("/engineering/e-measurement-book/mesurement-book"); // Assuming "/add-measurement" is the route for AddMeasurementComponent
  };

  const handleViewClick = () => {
    router.push("/engineering/e-measurement-book/measurement-views"); // Assuming "/add-measurement" is the route for AddMeasurementComponent
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilter = () => {
    setAnchorEl(null);
  };

  const handleApplyFilter = () => {
    // Implement filtering logic based on filterCriteria
    // For example:
    const filteredData = tableData.filter((item) =>
      item.projectTitle.includes(filterCriteria || "") ||
      item.projectNumber.includes(filterCriteria || "") ||
      item.status.includes(filterCriteria || "")
    );

    // Return the filtered data or do something with it
    console.log(filteredData);

    // Close the popover
    handleCloseFilter();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <div className="flex justify-end">
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddMeasurementClick}
          sx={{ bgcolor: "indigo.500", color: "white", float: "right", margin: "15px" }}
        >
          Add Measurement
        </Button>
      </div>
      <div className="bg-white">
        <div className="flex justify-between mt-4">
          <div className={`flex items-center mr-3 pb-1 w-20 justify-center`}>
            <Image src={list} height={20} width={20} alt="pro-1" />
            <span className="ml-2 text-gray-500">List</span>
          </div>
          <div className="">
            <Button onClick={handleFilterClick}>
              <svg width="65" height="56" viewBox="0 0 65 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d_1541_82)">
                    <rect x="5.22165" y="1.83781" width="54" height="45" rx="8.5" transform="rotate(-0.71425 5.22165 1.83781)" fill="white" stroke="#A19BE4"/>
                    <g clipPath="url(#clip0_1541_82)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M25.2075 17.8399C23.2659 16.0459 24.5709 12.8029 27.214 12.8538L38.2129 13.0658C40.856 13.1167 42.0352 16.4076 40.0258 18.1255L35.7405 21.7892C35.5325 21.9671 35.4104 22.2255 35.4052 22.4991L35.217 32.2605C35.1841 33.9678 33.1035 34.783 31.9196 33.5525L30.0402 31.5993C29.6878 31.233 29.4952 30.7416 29.505 30.2334L29.6562 22.3884C29.6615 22.1147 29.5495 21.8518 29.3484 21.666L25.2075 17.8399ZM27.1771 14.7702C26.2961 14.7532 25.8611 15.8342 26.5083 16.4322L30.6492 20.2583C31.2524 20.8156 31.5884 21.6042 31.5725 22.4253L31.4214 30.2704L33.3007 32.2236L33.4889 22.4622C33.5047 21.6412 33.8708 20.8661 34.495 20.3324L38.7803 16.6687C39.45 16.096 39.057 14.9991 38.176 14.9821L27.1771 14.7702Z" fill="#8F9399"/>
                    </g>
                    </g>
                    <defs>
                    <filter id="filter0_d_1541_82" x="0.826935" y="0.77002" width="63.3462" height="54.459" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1541_82"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1541_82" result="shape"/>
                    </filter>
                    <clipPath id="clip0_1541_82">
                    <rect width="23" height="23" fill="white" transform="translate(21.2335 11.7803) rotate(1.10404)"/>
                    </clipPath>
                    </defs>
              </svg>

            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleCloseFilter}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <div className="p-4">
                <TextField
                  label="Search Criteria"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setFilterCriteria(e.target.value)}
                />
                <Button onClick={handleApplyFilter} variant="contained" sx={{ mt: 2 }}>
                  Apply Filter
                </Button>
              </div>
            </Popover>
          </div>
        </div>
        <TableContainer>
          <Table>
            <TableHead className="text-black font-serif">
              <TableRow className="bg-gray-200">
                <TableCell>#</TableCell>
                <TableCell>Project Title</TableCell>
                <TableCell>Project Number</TableCell>
                <TableCell>Project Budget</TableCell>
                <TableCell>Utilized Budget</TableCell>
                <TableCell>Remaining Budget</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Views</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.projectTitle}</TableCell>
                  <TableCell>{row.projectNumber}</TableCell>
                  <TableCell>{row.projectBudget}</TableCell>
                  <TableCell>{row.utilizedBudget}</TableCell>
                  <TableCell>{row.remainingBudget}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell><div className="p-2 rounded-md bg-indigo-500 text-white text-center w-[4rem] h-[28] cursor-pointer" onClick={handleViewClick}>View</div></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
