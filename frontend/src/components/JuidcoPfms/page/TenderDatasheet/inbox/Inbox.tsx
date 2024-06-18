'use client'

import React from 'react'
import HeroTenderDatasheet from '../Index'
import { useProjectProposalTenderList } from '@/hooks/data/tenderDatasheetHooks'

const Inbox = () => {
  return (
    <HeroTenderDatasheet useProjectProposalList={useProjectProposalTenderList}/>
  )
}

export default Inbox