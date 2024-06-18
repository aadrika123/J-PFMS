'use client'

import React from "react";
import HeroTenderDatasheet from "../Index";
import { useProjectProposalTenderRejectedList } from "@/hooks/data/tenderDatasheetHooks";

const Rejected = () => {
  return <HeroTenderDatasheet useProjectProposalList={useProjectProposalTenderRejectedList} />;
};

export default Rejected;
