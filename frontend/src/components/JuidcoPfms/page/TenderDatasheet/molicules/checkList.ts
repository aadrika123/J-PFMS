import BasicIcon from "@/assets/svg/Documents.svg";
import CoverIcon from "@/assets/svg/Parchment.svg";
import WorkIcon from "@/assets/svg/New Job.svg";
import CriticalIcon from "@/assets/svg/Time Management Skills.svg";
import BidIcon from "@/assets/svg/First Place Ribbon.svg";
import FeeIcon from "@/assets/svg/Rupee.svg";

export const bg_color = "white";

export const coverList = {
  title: "No of Covers",
  options: [
    {
      label: "Single Cover",
      value: "1",
      list: ["Fee/Prequal/Technical/Financial"],
    },
    {
      label: "Two Cover",
      value: "2",
      list: ["Fee/Prequal/Technical", "Financial"],
    },
    {
      label: "Three Cover",
      value: "3",
      list: ["Fee", "Prequal/Technical", "Financial"],
    },
    {
      label: "Four Cover",
      value: "4",
      list: ["Fee", "Prequal", "Technical", "Financial"],
    },
  ],
};

export const contractFormList = {
  title: "Form of Contract",
  options: [
    {
      label: "Work Contract",
      value: "work-contract",
    },
    {
      label: "Auction",
      value: "auction",
    },
    {
      label: "Service Contract",
      value: "service-contract",
    },
    {
      label: "Buy",
      value: "buy",
    },
    {
      label: "Empanelment",
      value: "empanelment",
    },
    {
      label: "Buy & Service",
      value: "buy-service",
    },
  ],
};

export const tenderTypeList = {
  title: "Tender Type",
  options: [
    {
      label: "Open",
      value: "open",
      isChecked: false,
    },
    {
      label: "Limited",
      value: "limited",
      isChecked: false,
    },
    {
      label: "EOI",
      value: "eoi",
      isChecked: false,
    },
    {
      label: "Action",
      value: "action",
      isChecked: false,
    },
    {
      label: "Single",
      value: "single",
      isChecked: false,
    },
  ],
};

export const tenderCategoryList = {
  title: "Tender Category",
  options: [
    {
      label: "Goods",
      value: "goods",
    },
    {
      label: "Works",
      value: "works",
    },
    {
      label: "Services",
      value: "services",
    },
  ],
};

export const payment_mode = {
  title: "Payment Mode",
  options: [
    {
      label: "Online",
      value: "online",
    },
    {
      label: "Offline",
      value: "offline",
    },
  ],
};

export const online_bank = {
  title: "Online (Banks)",
  options: [
    {
      label: "ICICI",
      value: "icici",
    },
    {
      label: "SBI",
      value: "sbi",
    },
    {
      label: "UTI",
      value: "uti",
    },
    {
      label: "PNB",
      value: "pnb",
    },
  ],
};

export const offline_instument = {
  title: "Offline (Instruments)",
  options: [
    {
      label: "SS-Small Saving Instrument",
      value: "1",
    },
    {
      label: "BG-Bank Guarantee",
      value: "2",
    },
    {
      label: "BC-Bankers Cheque",
      value: "3",
    },
    {
      label: "DD-Demand Draft",
      value: "4",
    },
  ],
};

//////////// Tab List
export const tabList = [
  {
    id: 1,
    icon: BasicIcon,
    title: "Basic Details",
  },
  {
    id: 2,
    icon: CoverIcon,
    title: "Cover Details",
  },
  {
    id: 3,
    icon: WorkIcon,
    title: "Work Details",
  },
  {
    id: 4,
    icon: FeeIcon,
    title: "Fee Details",
  },
  {
    id: 5,
    icon: CriticalIcon,
    title: "Critical Details",
  },
  {
    id: 6,
    icon: BidIcon,
    title: "Bid Details",
  },
];
