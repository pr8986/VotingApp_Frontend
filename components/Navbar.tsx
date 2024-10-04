import React from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function Navbar() {
    const router = useRouter();
    const logOut = () => {
        localStorage.removeItem('authToken');
        router.push('/');
    }
    return (
        <nav className='w-full border-b px-8 py-4 border-white flex justify-between mb-4'>
            <Link href={'/profile'} className='text-2xl'>Voting App</Link>
            <button onClick={() => logOut()} className=" bg-white hover:bg-red-500 transition-all hover:text-white text-black px-4 py-1.5  rounded-full">
                Log out
            </button>
        </nav>
    )
}
