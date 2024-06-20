import React, { ChangeEvent } from "react";
import { useUser } from "@/components/global/molecules/general/useUser";
import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";
import { PROJECT_PROPOSAL_VERIFICATION_QUERY_KEYS, useCommentList } from "@/hooks/data/ProjectProposalsHooks";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useQueryClient } from "react-query";
import axios from "@/lib/axiosConfig";
import { PFMS_URL } from "@/utils/api/urls";
import ConfirmationPopup from "@/components/global/molecules/ConfirmationPopup";
import Button from "@/components/global/atoms/buttons/Button";
import Image from "next/image";
import { DateFormatter } from "@/utils/helper";
import admi from "@/assets/svg/admi.svg";
import { PROJECT_PROPOSAL_FULLY_APPROVED_API } from "../data-hooks/ready-for-tendering-data";





type StateType = {
  comment: string | null;
};

type ActionComponentPropsType = {
  proposalId: number;
  proposalDetails: any;
  readOnly: boolean;
};

export const ActionComponent: React.FC<ActionComponentPropsType> = (props) => {
  const pathName = usePathname();

  const [sendBackPopupVisible, setSendBackPopupVisible] = useState<boolean>(false);
  const [sendForwardPopupVisible, setSendForwardPopupVisible] = useState<boolean>(false);

  const { data: commentList } = useCommentList(props.proposalId);


  const [workingAnimation, activateWorkingAnimation, hideWorkingAnimation] = useWorkingAnimation();
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useUser();
  const [state, setState] = useState<StateType>({
    comment: null,
  });
  const { comment } = state;




  const sendForward = async () => {
    if (!comment) {
      toast.error("Kindly provide some comment !");
      return;
    }

    activateWorkingAnimation();


    const res = await axios({
      url: `${PFMS_URL.PROJECT_VERIFICATION.approve}`,
      method: "POST",
      data: {
        data: {
          proposalId: props?.proposalId,
          comment,
        },
      },
    });

    hideWorkingAnimation();

    if (!res.data.status) throw "Something Went Wrong!!!";

    toast.success("Forwarded successfully.");




    console.log("funny", res.data.data);
    if(res?.data?.data?.fully_approved){
      queryClient.invalidateQueries([PROJECT_PROPOSAL_FULLY_APPROVED_API]);
      router.push(pathName + '?section=ready_for_tendering&viewMode=list');
    }
    else {
      queryClient.invalidateQueries([PROJECT_PROPOSAL_VERIFICATION_QUERY_KEYS.OUTBOX_LIST]);
      router.push(pathName + '?section=outbox&viewMode=list');
    }

    queryClient.invalidateQueries([PROJECT_PROPOSAL_VERIFICATION_QUERY_KEYS.INBOX_LIST]);
    queryClient.invalidateQueries([PROJECT_PROPOSAL_VERIFICATION_QUERY_KEYS.PROPOSAL]);
    queryClient.invalidateQueries([PROJECT_PROPOSAL_VERIFICATION_QUERY_KEYS.COMMENT_LIST]);

    return res.data.data;

  }


  const handleSendBack = async () => {

    if (!comment) {
      toast.error("Kindly provide some comment !");
      return;
    }

    activateWorkingAnimation();


    const res = await axios({
      url: `${PFMS_URL.PROJECT_VERIFICATION.sendBack}`,
      method: "POST",
      data: {
        data: {
          proposalId: props?.proposalId,
          comment,
        },
      },
    });

    hideWorkingAnimation();

    if (!res.data.status) throw "Something Went Wrong!!!";

    toast.success("Sent Back Successfully");
    router.push(pathName + '?section=inbox&viewMode=list');


    queryClient.invalidateQueries([PROJECT_PROPOSAL_VERIFICATION_QUERY_KEYS.INBOX_LIST]);
    queryClient.invalidateQueries([PROJECT_PROPOSAL_VERIFICATION_QUERY_KEYS.INBOX_ITEM_COUNT]);
    queryClient.invalidateQueries([PROJECT_PROPOSAL_VERIFICATION_QUERY_KEYS.COMMENT_LIST]);


    return res.data.data;
  };

  return (
    <>
      {workingAnimation}
      {sendBackPopupVisible && (<ConfirmationPopup message="Send the proposal back?" cancel={() => setSendBackPopupVisible(false)} continue={handleSendBack} />)}
      {sendForwardPopupVisible && (<ConfirmationPopup message="Forward the proposal?" cancel={() => setSendForwardPopupVisible(false)} continue={sendForward} />)}


      <Toaster />
      <div className="flex mt-4 justify-between">
        <div className="bg-[#f9fafc]">
          {!props.readOnly && (<div className="p-4">
            <span className="mt-4 text-secondary_black">Comments</span>
            <textarea
              className="bg-white border text-secondary"
              name="comments"
              cols={30}
              rows={5}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setState({ ...state, comment: e.target.value })
              }
            />

            <div className="flex justify-between mt-8">
              {!user?.isBackOffice() && (
                <Button
                  onClick={() => setSendBackPopupVisible(true)}
                  className="hover:bg-[#f44646]"
                  variant="danger"
                >
                  Send Back
                </Button>
              )}

              <Button variant="primary" onClick={() => setSendForwardPopupVisible(true)}>
                Forward
              </Button>
            </div>
          </div>)}







        </div>

        <div>
          Comments:
          {commentList?.map((item: any, index: number) => {
            return (
              <>
                <hr className="mb-4" />

                <div className={item?.last_action == "forwarded" ?
                  "bg-green-100 p-4 mt-4 rounded-lg flex relative w-full" :
                  "bg-red-100 p-4 mt-4 rounded-lg flex relative w-full"
                }>
                  <div className="h-5 w-5 bg-[#3abdf3] rounded-full text-white flex items-center justify-center absolute top-0 left-0">
                    {index + 1}
                  </div>
                  <div>
                    <Image src={admi} alt="admi" />
                  </div>

                  <div>
                    <div className="flex gap-2">
                      <div className="whitespace-nowrap font-bold ">{item?.user_name ? item?.user_name : "No Name"}</div>
                      <div className="whitespace-nowrap">({item?.role})</div>
                    </div>
                    <div>
                      <div>{item?.comment}</div>
                      <div>{DateFormatter(item?.created_at)}</div>
                    </div>
                  </div>


                </div>
              </>
            );
          })}
        </div>

      </div>
    </>
  );
};
