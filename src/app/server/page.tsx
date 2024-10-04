import { auth } from '../../../auth';
import React from 'react'

const Server = async () => {
    const session = await auth();
    console.log("session :", session);

    return (
        <div className='flex flex-col justify-center items-center h-screen w-full'>
            <h1 className='text-3xl'>Middleware</h1>
            <p>{session?.user?.name}</p>
            <p>nama: {session?.user?.name}</p>
            <p className='text-2xl'>{session?.user?.email}</p>
        </div>
    )
}

export default Server