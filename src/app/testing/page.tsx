import React from 'react'
import SearchBtn from '../../components/SearchBtn'
import Footer from './Footer'
import { InfiniteMovingCardsDemo } from '@/components/MovingCardDemo'
import ToggleButon from '@/components/ToggleButon'
import { SideBar } from '@/components/SideBar'
import { MobileSidebar } from '@/components/ui/sidebar'

const page = () => {
  return (
    <div className='container flex justify-center items-center mx-auto h-screen '>
      <MobileSidebar/>
    </div>
  )
}

export default page