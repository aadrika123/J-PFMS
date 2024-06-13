"use client";

import React from "react";
import HeroTenderDatasheet from "../Index";
import { useProjectProposalList11 } from "@/hooks/data/ProjectProposalsHooks";

const Outbox = () => {
  return (
    <HeroTenderDatasheet useProjectProposalList={useProjectProposalList11} />
  );
};

export default Outbox;
