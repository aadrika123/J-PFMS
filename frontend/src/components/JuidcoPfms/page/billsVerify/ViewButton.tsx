import Button from "@/components/global/atoms/Button";
import { useWorkingAnimation } from "@/components/global/molecules/general/useWorkingAnimation";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const ViewButton = (id: string) => {
  const pathName = usePathname();
  const router = useRouter();
  const [workingAnimation, activateWorkingAnimation] = useWorkingAnimation();

  const onViewButtonClick = (id: string) => {
    activateWorkingAnimation();
    router.push(`${pathName}/view/${id}?mode=view`);
  };

  return (
    <>
      {workingAnimation}
      <Button
        variant="primary"
        className="py-2 px-4"
        onClick={() => onViewButtonClick(id)}
      >
        View
      </Button>
    </>
  );
};

export default ViewButton;
