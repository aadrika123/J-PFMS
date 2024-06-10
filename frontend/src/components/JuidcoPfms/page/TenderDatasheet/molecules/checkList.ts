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
      listInLower: ["fee/prequal/technical/financial"],
    },
    {
      label: "Two Cover",
      value: "2",
      list: ["Fee/Prequal/Technical", "Financial"],
      listInLower: ["fee/prequal/technical", "financial"],
    },
    {
      label: "Three Cover",
      value: "3",
      list: ["Fee", "Prequal/Technical", "Financial"],
      listInLower: ["fee", "prequal/technical", "financial"],
    },
    {
      label: "Four Cover",
      value: "4",
      list: ["Fee", "Prequal", "Technical", "Financial"],
      listInLower: ["fee", "prequal", "technical", "financial"],
    },
  ],
};

export const emd_fee_type = {
  title: "EMD Fee Type",
  options: [
    {
      label: "Fixed",
      value: "fixed",
    },
    {
      label: "Percentage",
      value: "percentage",
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

export const online_bank = [
  {
    id: 1,
    name: "ICICI",
    value: 1,
  },
  {
    id: 2,
    name: "SBI",
    value: 2,
  },
  {
    id: 3,
    name: "UTI",
    value: 3,
  },
  {
    id: 4,
    name: "PNB",
    value: 4,
  },
];

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

export const product_category = {
  title: "Product Category",
  options: [
    {
      label: "Civil Works",
      value: "civil-works",
    },
    {
      label: "Electrical Works",
      value: "electrical-works",
    },
    {
      label: "Fleet Management",
      value: "fleet-management",
    },
    {
      label: "Computer Systems",
      value: "computer-systems",
    },
  ],
};

export const tender_value = {
  title: "Tender Value",
  options: [
    {
      label: "INR",
      value: "INR",
    },
    {
      label: "US",
      value: "US",
    },
    {
      label: "EUR",
      value: "EUR",
    },
  ],
};

export const contract_type = {
  title: "Contract Type",
  options: [
    {
      label: "Tender",
      value: "tender",
    },
    {
      label: "Empanelment",
      value: "empanelment",
    },
  ],
};

export const bid_validity = {
  title: "Bid Validity (Days)",
  options: [
    {
      label: "120",
      value: "120",
    },
    {
      label: "90",
      value: "90",
    },
    {
      label: "60",
      value: "60",
    },
    {
      label: "30",
      value: "30",
    },
    {
      label: "Others",
      value: "others",
    },
  ],
};

export const tenderer_class = {
  title: "Tender Class",
  options: [
    {
      label: "A",
      value: "a",
    },
    {
      label: "B",
      value: "b",
    },
    {
      label: "C",
      value: "c",
    },
    {
      label: "D",
      value: "d",
    },
    {
      label: "E",
      value: "e",
    },
    {
      label: "I",
      value: "i",
    },
    {
      label: "II",
      value: "ii",
    },
    {
      label: "III",
      value: "iii",
    },
    {
      label: "IV",
      value: "iv",
    },
    {
      label: "V",
      value: "v",
    },
    {
      label: "Others",
      value: "others",
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
    title: "Critical Dates",
  },
  {
    id: 6,
    icon: BidIcon,
    title: "Bid Details",
  },
  {
    id: 7,
    icon: BidIcon,
    title: "Preview",
  },
];
