import { SignInForm } from '@/components/SignInForm'
import React from 'react'
import "@/app/globals.css"

const SignIn = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
        <h1 className='font-bold text-2xl sm:text-3xl text-center'>Sign In</h1>
        <SignInForm />
    </div>
  )
}

export default SignIn