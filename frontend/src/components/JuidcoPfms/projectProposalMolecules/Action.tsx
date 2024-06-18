import { useUser } from "@/components/global/molecules/general/useUser";
import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";
import { PROJECT_PROPOSAL_VERIFICATION_QUERY_KEYS } from "@/hooks/data/ProjectProposalsHooks";
import { PFMS_URL } from "@/utils/api/urls";
import { usePathname, useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useQueryClient } from "react-query";
import axios from "@/lib/axiosConfig";
import ConfirmationPopup from "@/components/global/molecules/ConfirmationPopup";
import Button from "@/components/global/atoms/buttons/Button";
import Image from "next/image";
import { DateFormatter } from "@/utils/helper";
import admi from "@/assets/svg/admi.svg";
import { useActionCommentList } from "@/hooks/data/tenderDatasheetHooks";

type StateType = {
  comment: string | null;
};

type ActionPropsType = {
  tenderDatasheetId: number;
  readOnly: boolean;
};

const Action: React.FC<ActionPropsType> = (props) => {
  const pathName = usePathname();

  const [sendBackPopupVisible, setSendBackPopupVisible] =
    useState<boolean>(false);
  const [sendForwardPopupVisible, setSendForwardPopupVisible] =
    useState<boolean>(false);

  const { data: commentList } = useActionCommentList(props.tenderDatasheetId);

  const [workingAnimation, activateWorkingAnimation, hideWorkingAnimation] =
    useWorkingAnimation();
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
      url: `${PFMS_URL.TENDER_FORM.forward}/${props.tenderDatasheetId}`,
      method: "POST",
      data: {
        data: {
          comment,
        },
      },
    });

    hideWorkingAnimation();

    if (!res.data.status) throw "Something Went Wrong!!!";

    toast.success("Forwarded successfully.");

    queryClient.invalidateQueries([
      "project-proposals-outbox-tender",
    ]);

    queryClient.invalidateQueries([
      "project-proposals-rejected-tender"
    ]);

    queryClient.invalidateQueries([
      "project-proposals-tender"
    ]);

    router.push(pathName.split("/view")[0] + '/outbox');
    return res.data.data;
  };

  const handleSendBack = async () => {
    if (!comment) {
      toast.error("Kindly provide some comment !");
      return;
    }

    activateWorkingAnimation();

    const res = await axios({
      url: `${PFMS_URL.TENDER_FORM.sendBack}/${props.tenderDatasheetId}`,
      method: "POST",
      data: {
        data: {
          comment,
        },
      },
    });

    hideWorkingAnimation();

    if (!res.data.status) throw "Something Went Wrong!!!";

    toast.success("Sent Back Successfully");
    router.push(pathName.split("/view")[0] + '/rejected');

    queryClient.invalidateQueries([
      "project-proposals-outbox-tender",
    ]);

    queryClient.invalidateQueries([
      "project-proposals-rejected-tender"
    ]);

    queryClient.invalidateQueries([
      "project-proposals-tender"
    ]);


    return res.data.data;
  };

  return (
    <>
      {workingAnimation}
      {sendBackPopupVisible && (
        <ConfirmationPopup
          message="Send the tender form back?"
          cancel={() => setSendBackPopupVisible(false)}
          continue={handleSendBack}
        />
      )}
      {sendForwardPopupVisible && (
        <ConfirmationPopup
          message="Forward the tender form?"
          cancel={() => setSendForwardPopupVisible(false)}
          continue={sendForward}
        />
      )}

      <Toaster />
      <div className="flex mt-4">
        <div className="bg-[#f9fafc] flex justify-between pr-4 w-full">
          {!props.readOnly && (
            <div className="p-4">
              <textarea
                className="bg-white border text-secondary p-2"
                name="comments"
                placeholder="Enter Your Comment"
                cols={30}
                rows={5}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setState({ ...state, comment: e.target.value })
                }
              />

              <div className="flex justify-between mt-4">
                {!user?.isJuniorEngineer() && (
                  <Button
                    onClick={() => setSendBackPopupVisible(true)}
                    className="hover:bg-[#f44646]"
                    variant="danger"
                  >
                    Send Back
                  </Button>
                )}

                <Button
                  variant="primary"
                  onClick={() => setSendForwardPopupVisible(true)}
                >
                  Forward
                </Button>
              </div>
            </div>
          )}

          <div>
            Comments:
            {commentList?.map((item: any, index: number) => {
              return (
                <>
                  <hr className="mb-4" />

                  <div className="bg-[#e0f2fe] p-4 mt-4 rounded-lg flex relative w-full">
                    <div className="h-5 w-5 bg-[#3abdf3] rounded-full text-white flex items-center justify-center absolute top-0 left-0">
                      {index + 1}
                    </div>
                    <div>
                      <Image src={admi} alt="admi" />
                    </div>

                    <div>
                      <div className="flex gap-2">
                        <div className="whitespace-nowrap font-bold ">
                          {item?.user_name ? item?.user_name : "No Name"}
                        </div>
                        <div className="whitespace-nowrap">({item?.roles})</div>
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
      </div>
    </>
  );
};

export default Action;
