import AwardedTendersInputForm from '@/components/JuidcoPfms/page/AwardedTenderDetails/AwardedTenderInputForm';
import PageLayout from '@/components/Layouts/PageLayout'
import React from 'react'

const page = ({params}: {params :{awardedTenderFormId: number}}) => {
  const {awardedTenderFormId} = params;
   
  return (
    <PageLayout>
        <AwardedTendersInputForm awardedTenderFormId={Number(awardedTenderFormId)} />
    </PageLayout>
  )
}

export default page