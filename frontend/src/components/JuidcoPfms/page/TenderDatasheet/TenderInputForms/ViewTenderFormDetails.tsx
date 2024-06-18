"use client";
import React, { useState } from "react";
import Popup from "@/components/global/molecules/Popup";
import Button from "@/components/global/atoms/buttons/Button";
import { PFMS_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import { useQuery } from "react-query";
import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";
import { useRouter } from "next/navigation";
import { getLocalTime } from "@/utils/helper";
import toast, { Toaster } from "react-hot-toast";
import { tenderDatasheetSchema } from "pfmslib";
import { useReactToPrint } from "react-to-print";
import { useUser } from "@/components/global/molecules/general/useUser";
import Input from "@/components/global/atoms/Input";
import ConfirmationPopupWithInput from "../molecules/ConfirmationPopupWithInputField";

type ViewTenderFormDetailsProps = {
  handleTabChange: (type: string) => void;
  tenderFormId: number;
  componentRef: any;
};

const ViewTenderFormDetails: React.FC<ViewTenderFormDetailsProps> = (props) => {
  const { handleTabChange, tenderFormId, componentRef } = props;
  const router = useRouter();
  const user = useUser();
  // const componentRef = useRef<any>();
  const [workingAnimation, activateWorkingAnimation, hideWorkingAnimation] =
    useWorkingAnimation();

  const [state, setState] = useState<any>({
    activeStep: 0,
    showPopup: false,
    docData: null,
    showConfirmation: false,
    comment: "",
  });

  const { showPopup, docData, showConfirmation } = state;

  ///////// Fetching Data
  const fetch = async () => {
    activateWorkingAnimation();
    const res = await axios({
      url: `${PFMS_URL.TENDER_FORM.getAllDetails}/${tenderFormId}`,
      method: "GET",
    });

    if (!res.data.status) throw "Someting Went Wrong!!";

    hideWorkingAnimation();
    return res.data.data;
  };

  const { data: data }: any = useQuery(
    ["tender-all-details", tenderFormId],
    fetch
  );

  const {
    basic_details,
    cover_details,
    work_details,
    critical_dates,
    bid_openers_details,
    fee_details,
  } = data ?? {};

  /*  Handle View Document  */
  const handleViewDoc = (path: string) => {
    setState((prev: any) => ({
      ...prev,
      showPopup: !showPopup,
      docData: path,
    }));
  };

  /* Handle Submit */
  const handleSubmit = async () => {
    try {
      await tenderDatasheetSchema.validate(data);

      activateWorkingAnimation();

      const res = await axios({
        url: `${PFMS_URL.TENDER_FORM.submit}/${tenderFormId}`,
        method: "POST",
        data: {
          data: { comment: state.comment },
        },
      });

      if (!res.data.status) throw "Something Went Wrong!!!";

      router.push("/tender-datasheet/outbox");
    } catch (error: any) {
      toast.error(error.message, {
        duration: 6000,
      });
    } finally {
      hideWorkingAnimation();
    }
  };

  ////////////// handle cancle /////////////
  const handleCancel = () => {
    state.comment !== "" && setState({ ...state, showConfirmation: false });
  };

  ////////////// handle cancle /////////////
  const handleContinue = () => {
    if (state.comment === "") {
      toast.error("Kindly enter some comments");
    } else {
      handleSubmit();
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef?.current,
  });

  return (
    <>
      {workingAnimation}
      {data && (
        <>
          <Toaster />
          {showConfirmation && (
            <ConfirmationPopupWithInput
              inputComment={
                <Input
                  type="text"
                  placeholder="Enter Comment"
                  name="comment"
                  onChange={(e) =>
                    setState({ ...state, comment: e.target.value })
                  }
                />
              }
              message="Are you sure? want to forward?"
              cancel={handleCancel}
              continue={handleContinue}
            />
          )}
          {showPopup && (
            <Popup padding="0">
              <iframe width={1000} height={570} src={docData}></iframe>
              <div className="flex items-center absolute bottom-3 self-center">
                <Button
                  onClick={() => setState({ ...state, showPopup: !showPopup })}
                  variant="cancel"
                >
                  Close
                </Button>
              </div>
            </Popup>
          )}
          <div ref={componentRef}>
            {/* Header section Basic Details */}
            <div className="flex items-center bg-primary_bg_indigo px-3 py-1 rounded mb-3 shadow-lg">
              {/* <Image src={CriticalIcon} height={30} width={30} alt="tender-icon" /> */}
              <header className="font-bold ml-2 text-white">
                Basic Details
              </header>
            </div>
            <div className="bg-white shadow-xl rounded border p-4 grid grid-cols-2 gap-2">
              {/* <span className="font-medium">
          Organization Chain:&nbsp;
          <span className="text-gray-500 text-xs">
          RWS EinC | RWD CE | RWD SE | RANCHI | RWD EE, RANCHI.
          </span>
        </span> */}
              <span className="font-medium">
                Withdrawal Allowed:&nbsp;{" "}
                <span className="text-gray-500 text-xs">
                  {basic_details?.allow_withdrawal ? "Yes" : "No"}
                </span>
              </span>
              <span className="font-medium">
                Tender Reference Number:&nbsp;
                <span className="text-gray-500 text-xs">
                  {basic_details?.reference_no}
                </span>
              </span>
              <span className="font-medium">
                Form of Contract:&nbsp;
                <span className="text-gray-500 text-xs">
                  {basic_details?.contract_forms?.join(", ")}
                </span>
              </span>
              {/* <span className="font-medium">
          Tender ID:&nbsp;
          <span className="text-gray-500 text-xs">2024_RWD_85407_1</span>
        </span> */}
              {/* <span className="font-medium">
          No of Covers:&nbsp; <span className="text-gray-500 text-xs">2</span>
        </span> */}
              <span className="font-medium">
                Tender Type:&nbsp;
                <span className="text-gray-500 text-xs">
                  {basic_details?.tender_type ?? "Nill"}
                </span>
              </span>
              {/* <span className="font-medium">
          Item Wise Technical Evaluation Allowed :&nbsp;
          <span className="text-gray-500 text-xs">No</span>
        </span> */}
              <span className="font-medium">
                Tender Category:&nbsp;{" "}
                <span className="text-gray-500 text-xs">
                  {basic_details?.tender_categories?.join(", ")}
                </span>
              </span>
              {/* <span className="font-medium">
          Is Multi Currency Allowed for BOQ:&nbsp;
          <span className="text-gray-500 text-xs">No</span>
        </span> */}
              <span className="font-medium">
                Payment Mode:&nbsp;{" "}
                <span className="text-gray-500 text-xs">
                  {basic_details?.payment_mode ?? "Nill"}
                </span>
              </span>
              {/* <span className="font-medium">
          Allow Two Stage Bidding:&nbsp;
          <span className="text-gray-500 text-xs">No</span>
          </span>
          <span className="font-medium">
          Multi Currency Allowed For Fee:&nbsp;
          <span className="text-gray-500 text-xs">No</span>
        </span> */}
            </div>

            {/* Header section Cover Details*/}
            <div className="flex items-center bg-primary_bg_indigo px-3 py-1 rounded mb-3 shadow-lg mt-4">
              {/* <Image src={CriticalIcon} height={30} width={30} alt="tender-icon" /> */}
              <header className="font-bold ml-2 text-white">
                Cover Details, No of Cover-{cover_details?.cover_no}
              </header>
            </div>
            <div className="bg-white shadow-xl rounded border p-4 grid grid-cols-2 gap-2 items-start">
              <div className="flex flex-col">
                <span className="font-medium">
                  No of Covers:&nbsp;
                  <span className="text-gray-500 text-xs">
                    {cover_details?.cover_no}
                  </span>
                </span>
                <span className="font-medium">
                  Remarks:&nbsp;
                  <span className="text-gray-500 text-xs">
                    {cover_details?.content}
                  </span>
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {cover_details?.files?.map((file: any, index: number) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center"
                  >
                    <img
                      onClick={() => handleViewDoc(file?.path)}
                      src={file.path}
                      height={50}
                      width={50}
                      alt="cover-1"
                      className="max-h-12 object-cover"
                    />
                    <span>Cover 0{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Header section Work Item Details*/}
            <div className="flex items-center bg-primary_bg_indigo px-3 py-1 rounded mb-3 shadow-lg mt-4">
              {/* <Image src={CriticalIcon} height={30} width={30} alt="tender-icon" /> */}
              <header className="font-bold ml-2 text-white">
                Work Item Details
              </header>
            </div>
            <div className="flex flex-col bg-white shadow-xl rounded border p-4">
              <span className="font-medium">
                Work Item Title:&nbsp;
                <span className="text-gray-500 text-xs">
                  {work_details?.work_title}
                </span>
              </span>
              <span className="font-medium">
                Work Description:&nbsp;
                <span className="text-gray-500 text-xs">
                  {work_details?.description}
                </span>
              </span>
              <div className="grid grid-cols-2 gap-2 items-start mt-4">
                <span className="font-medium">
                  Pre Qualification Details:&nbsp;
                  <span className="text-gray-500 text-xs">
                    {work_details?.pre_qualification_details ?? "Nill"}
                  </span>
                </span>
                <span className="font-medium">
                  Location(Work/Item/Service):&nbsp;
                  <span className="text-gray-500 text-xs">
                    {work_details?.location ?? "Nill"}
                  </span>
                </span>
                <span className="font-medium">
                  Product Category :&nbsp;
                  <span className="text-gray-500 text-xs">
                    {work_details?.product_categories}
                  </span>
                </span>
                <span className="font-medium">
                  Pin Code:&nbsp;
                  <span className="text-gray-500 text-xs">
                    {work_details?.pin_code}
                  </span>
                </span>
                <span className="font-medium">
                  Product Sub Category:&nbsp;
                  <span className="text-gray-500 text-xs">
                    {work_details?.product_sub_category ?? "Nill"}
                  </span>
                </span>
                <span className="font-medium">
                  Bid Validity Date (In Days) :&nbsp;
                  <span className="text-gray-500 text-xs">
                    {work_details?.bid_validity}
                  </span>
                </span>
                <span className="font-medium">
                  Contract Type:&nbsp;
                  <span className="text-gray-500 text-xs">
                    {work_details?.contract_type}
                  </span>
                </span>
                <span className="font-medium">
                  Completion Period in Months:&nbsp;
                  <span className="text-gray-500 text-xs">
                    {work_details?.completion_period}
                  </span>
                </span>
                <span className="font-medium">
                  Tender Value :&nbsp;
                  <span className="text-gray-500 text-xs">
                    {work_details?.tender_value ?? "Nill"}
                  </span>
                </span>
              </div>
            </div>

            <div className="bg-white shadow-xl rounded border p-4 grid grid-cols-2 gap-2 items-start mt-4">
              <div className="flex flex-col gap-1">
                <span className="font-medium">
                  Pre Bid Meeting:&nbsp;
                  <span className="text-gray-500 text-xs">
                    {work_details?.pre_bid_meeting ? "Yes" : "No"}
                  </span>
                </span>
                <span className="font-medium">
                  Pre Bid Meeting Place :&nbsp;
                  <span className="text-gray-500 text-xs">
                    {work_details?.pre_bid_meeting_place ?? "Nill"}
                  </span>
                </span>
                <span className="font-medium">
                  Pre Bid Meeting Address:&nbsp;
                  <span className="text-gray-500 text-xs">
                    {work_details?.pre_bid_meeting_address ?? "Nill"}
                  </span>
                </span>
                <span className="font-medium">
                  Bid Opening Place :&nbsp;
                  <span className="text-gray-500 text-xs">
                    {work_details?.bid_opening_place ?? "Nill"}
                  </span>
                </span>
                <span className="font-medium">
                  Tenderer Class :&nbsp;
                  <span className="text-gray-500 text-xs">
                    {work_details?.tenderer_class?.join(", ")}
                  </span>
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-medium">
                  Inviting Officer Name:&nbsp;
                  <span className="text-gray-500 text-xs">
                    {work_details?.inviting_officer_name}
                  </span>
                </span>
                <span className="font-medium">
                  Inviting Officer Address:&nbsp;
                  <span className="text-gray-500 text-xs">
                    {work_details?.inviting_officer_address}
                  </span>
                </span>
                <span className="font-medium">
                  Inviting Officer Phone/Email :&nbsp;
                  <span className="text-gray-500 text-xs">
                    {work_details?.inviting_officer_contact}
                  </span>
                </span>
              </div>
            </div>

            {/* Header section Tender Fee Details*/}
            <div className="flex items-center bg-primary_bg_indigo px-3 py-1 rounded mb-3 shadow-lg mt-4">
              {/* <Image src={CriticalIcon} height={30} width={30} alt="tender-icon" /> */}
              <header className="font-bold ml-2 text-white">
                Tender Fee Details
              </header>
            </div>
            <div className="bg-white shadow-xl rounded border p-4 grid grid-cols-3">
              <span className="font-medium">
                Tender Fee :&nbsp;
                <span className="text-gray-500 text-xs">
                  {fee_details?.tender_fee ?? "Nill"}
                </span>
              </span>
              <span className="font-medium">
                Tender Fee Payable At:&nbsp;
                <span className="text-gray-500 text-xs">
                  {fee_details?.tender_fee_payable_at ?? "Nill"}
                </span>
              </span>
              <span className="font-medium">
                Surg Charges:&nbsp;
                <span className="text-gray-500 text-xs">
                  {fee_details?.surcharges ?? "Nill"}
                </span>
              </span>
              <span className="font-medium">
                Processing Fee:&nbsp;
                <span className="text-gray-500 text-xs">
                  {fee_details?.processing_fee ?? "Nill"}
                </span>
              </span>
              <span className="font-medium">
                Tender Fee Payable To:&nbsp;
                <span className="text-gray-500 text-xs">
                  {fee_details?.tender_fee_payable_to ?? "Nill"}
                </span>
              </span>
              <span className="font-medium">
                Other Charges:&nbsp;
                <span className="text-gray-500 text-xs">
                  {fee_details?.other_charges ?? "Nill"}
                </span>
              </span>
            </div>

            {/* Header section EMD Fee Details*/}
            <div className="flex items-center bg-primary_bg_indigo px-3 py-1 rounded mb-3 shadow-lg mt-4">
              {/* <Image src={CriticalIcon} height={30} width={30} alt="tender-icon" /> */}
              <header className="font-bold ml-2 text-white">
                EMD Fee Details
              </header>
            </div>
            <div className="bg-white shadow-xl rounded border p-4 grid grid-cols-3">
              <span className="font-medium">
                EMD Fee :&nbsp;
                <span className="text-gray-500 text-xs">
                  {fee_details?.emd_fee_type ?? "Nill"}
                </span>
              </span>
              <span className="font-medium">
                EMD Fee Payable To :&nbsp;
                <span className="text-gray-500 text-xs">
                  {fee_details?.emd_fee_payable_to ?? "Nill"}
                </span>
              </span>
              <span className="font-medium">
                EMD Exemption Allowed:&nbsp;
                <span className="text-gray-500 text-xs">
                  {fee_details?.emd_examption_allowed ? "Yes" : "No"}
                </span>
              </span>
              <span className="font-medium">
                EMD (Fixed/Percentage):&nbsp;
                <span className="text-gray-500 text-xs">
                  {fee_details?.emd_fee_type ?? "Nill"}
                </span>
              </span>
              <span className="font-medium">
                EMD Fee Payable At :&nbsp;
                <span className="text-gray-500 text-xs">
                  {fee_details?.emd_fee_payable_at ?? "Nill"}
                </span>
              </span>
            </div>

            {/* Header section Critical Dates*/}
            <div className="flex items-center bg-primary_bg_indigo px-3 py-1 rounded mb-3 shadow-lg mt-4">
              {/* <Image src={CriticalIcon} height={30} width={30} alt="tender-icon" /> */}
              <header className="font-bold ml-2 text-white">
                Critical Dates
              </header>
            </div>
            <div className="bg-white shadow-xl rounded border p-4 grid grid-cols-2 gap-3">
              <span className="font-medium">
                Publishing Date :&nbsp;
                <span className="text-gray-500 text-xs">
                  {getLocalTime(critical_dates?.publishing_date)}
                </span>
              </span>
              <span className="font-medium">
                Document Sale Start Date:&nbsp;
                <span className="text-gray-500 text-xs">
                  {getLocalTime(critical_dates?.document_sale_start_date)}
                </span>
              </span>
              <span className="font-medium">
                Seek Clarification Start Date:&nbsp;
                <span className="text-gray-500 text-xs">
                  {getLocalTime(critical_dates?.seek_clarification_start_date)}
                </span>
              </span>
              <span className="font-medium">
                Bid Opening Date:&nbsp;
                <span className="text-gray-500 text-xs">
                  {getLocalTime(critical_dates?.bid_opening_date)}
                </span>
              </span>
              <span className="font-medium">
                Document Sale End Date:&nbsp;
                <span className="text-gray-500 text-xs">
                  {getLocalTime(critical_dates?.document_sale_end_date)}
                </span>
              </span>
              <span className="font-medium">
                Seek Clarification End Date:&nbsp;
                <span className="text-gray-500 text-xs">
                  {getLocalTime(critical_dates?.seek_clarification_end_date)}
                </span>
              </span>
              <span className="font-medium">
                Pre Bid Meeting Date:&nbsp;
                <span className="text-gray-500 text-xs">
                  {getLocalTime(critical_dates?.pre_bid_meeting_date)}
                </span>
              </span>
            </div>

            {/* Header section Bid Openers Selection*/}
            <div className="flex items-center bg-primary_bg_indigo px-3 py-1 rounded mb-3 shadow-lg mt-4">
              {/* <Image src={CriticalIcon} height={30} width={30} alt="tender-icon" /> */}
              <header className="font-bold ml-2 text-white">
                Bid Openers Selection
              </header>
            </div>
            <div className="bg-white shadow-xl rounded border p-4 grid grid-cols-2">
              {bid_openers_details?.bid_openers?.map(
                (opener: any, index: number) => (
                  <React.Fragment key={index}>
                    <span className="font-medium">
                      BO{index + 1} Name/Designation :&nbsp;
                      <span className="text-gray-500 text-xs">
                        {opener?.name}
                      </span>
                    </span>
                    <span className="font-medium">
                      Email:&nbsp;
                      <span className="text-gray-500 text-xs">
                        {opener?.email}
                      </span>
                    </span>
                  </React.Fragment>
                )
              )}
            </div>

            {/* Header section Tender Documents*/}
            <div className="flex items-center bg-primary_bg_indigo px-3 py-1 rounded mb-3 shadow-lg mt-4">
              {/* <Image src={CriticalIcon} height={30} width={30} alt="tender-icon" /> */}
              <header className="font-bold ml-2 text-white">
                Tender Documents
              </header>
            </div>
            {bid_openers_details?.files?.map((file: any, index: number) => (
              <div
                key={index}
                className="bg-white shadow-xl rounded border p-4 grid grid-cols-3"
              >
                <div className="col-span-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      File Name :&nbsp;
                      <span className="text-gray-500 text-xs">
                        {file?.file_name}
                      </span>
                    </span>
                    <span className="font-medium">
                      Document Size :&nbsp;
                      <span className="text-gray-500 text-xs">
                        {file?.size}
                      </span>
                    </span>
                  </div>
                  <span className="font-medium">
                    Description :&nbsp;
                    <span className="text-gray-500 text-xs">
                      {file?.description}
                    </span>
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <img
                    onClick={() => handleViewDoc(file.path)}
                    src={file?.path}
                    height={50}
                    width={50}
                    alt={`bo-${index}`}
                    className="max-h-12 object-cover"
                  />
                  <span>B0{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4">
            <Button variant="cancel" onClick={() => handleTabChange("prev")}>
              Back
            </Button>
            {(data?.status === "draft" || data?.status === "rejected") &&
            user?.isJuniorEngineer() ? (
              <Button
                onClick={() => setState({ ...state, showConfirmation: true })}
                variant="primary"
              >
                Forward To EE
              </Button>
            ) : (
              <Button onClick={handlePrint} variant="primary">
                Print
              </Button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ViewTenderFormDetails;
