import React from "react";
import { BoldSpan } from "./BoxContainer";

type vendorDetail = {
  label: string;
  content: string;
};

type VendorCardsProps = {
  title: string;
  vendorDetails: vendorDetail[];
};

type ViewDetailsProps = {
  billDetails: any
}

export const VendorCards: React.FC<VendorCardsProps> = (props) => {
  const { title, vendorDetails } = props;
  return (
    <>
      <h1 className="my-4 text-secondary_black text-2xl">{title}</h1>
      <div className="border grid grid-cols-4 gap-4 p-6">
        {vendorDetails.map((vendor, index) => (
          <React.Fragment key={index}>
            <BoldSpan
              className="flex flex-col"
              label={vendor?.label}
              content={vendor?.content}
            />
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

const ViewDetails:React.FC<ViewDetailsProps> = (props) => {
  const {billDetails} = props
  const vendorDetails = [
    {
      label: "Vendor Name",
      content: billDetails?.party?.name,
    },
    {
      label: "Contact Number",
      content: billDetails?.mobile_no,
    },
    {
      label: "Email",
      content: billDetails?.email,
    },
    {
      label: "Contact Address",
      content: billDetails?.contact_address,
    },
    {
      label: "GST No",
      content: billDetails?.gst_no,
    },
    {
      label: "Aadhaar No",
      content: billDetails?.aadhar_no,
    },
  ];

  const vendorBankDetails = [
    {
      label: "Name of the Bank",
      content: billDetails?.bank_name,
    },
    {
      label: "Bank Account No",
      content: billDetails?.bank_acc_no,
    },
    {
      label: "IFSC Code",
      content: billDetails?.ifsc_code,
    },
    {
      label: "Bank Branch",
      content: billDetails?.branch,
    },
    {
      label: "PAN No",
      content: billDetails?.pan_no,
    },
    {
      label: "TIN No",
      content: billDetails?.tin_no,
    },
  ];

  return (
    <>
      <VendorCards title="Vendor Details" vendorDetails={vendorDetails} />
      <VendorCards
        title="Vendor Bank Details"
        vendorDetails={vendorBankDetails}
      />
    </>
  );
};

export default ViewDetails;
