import TenderInputForm from '@/components/JuidcoPfms/page/TenderDatasheet/TenderInputForm'
import PageLayout from '@/components/Layouts/PageLayout'
import React from 'react'

const page = ({params}: {params: {pageNo: number}}) => {
    const {pageNo} = params;
  return (
    <PageLayout>
        <TenderInputForm PageNo={pageNo}/>
    </PageLayout>
  )
}

export default page