import React from 'react'
import "@/app/globals.css"
import Dashboard from './dashboard/page'
import { auth } from '../../../auth';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await auth();
  if(!session) return redirect('/auth/signin')


  return (
    <div className='w-full h-screen overflow-y-scroll no-scrollbar'>
      <Dashboard/>
    </div>
  )
}

export default page