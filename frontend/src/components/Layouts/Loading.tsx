import React from 'react'
import loadingGif from "@/assets/gifs/loading.gif"
import Image from 'next/image'

const Loading = () => {
  return (
    <div className='bg-primary_bg_indigo absolute bg-opacity-50 inset-0 z-50'>
        <div className='flex items-center justify-center h-lvh'>
              <Image width="100" className=' bg-transparent' src={loadingGif} alt="d" />
        </div>
    </div>
  )
}

export default Loading