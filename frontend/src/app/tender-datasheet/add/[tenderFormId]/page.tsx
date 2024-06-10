import TenderInputForm from '@/components/JuidcoPfms/page/TenderDatasheet/TenderInputForm'
import PageLayout from '@/components/Layouts/PageLayout'
import React from 'react'

const page = ({params}: {params :{tenderFormId: number}}) => {
  const {tenderFormId} = params;
   
  return (
    <PageLayout>
        <TenderInputForm tenderFormId={Number(tenderFormId)} />
    </PageLayout>
  )
}

export default page