"use client";

import React from "react";
import HeroTenderDatasheet from "../Index";
import { useProjectProposalTenderOutboxList } from "@/hooks/data/tenderDatasheetHooks";

const Outbox = () => {
  return (
    <HeroTenderDatasheet useProjectProposalList={useProjectProposalTenderOutboxList} />
  );
};

export default Outbox;
