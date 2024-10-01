"use client"
import Main from '@/components/Main'
import React, { useState } from 'react'
import { BackgroundGradient } from '@/components/ui/background-gradient'
import FormLabel from '@/components/FormLabel'
import FormInput from '@/components/FormInput'
import FormContainer from '@/components/FormContainer'
import SubmitBtn from '@/components/SubmitBtn'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
    const [aadhar, setAadhar] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3001/user/login', {
                method: "POST",
                headers: {
                    'Content-type': "application/json"
                },
                body: JSON.stringify({
                    adharCardNumber: aadhar,
                    password
                })
            })
            const data = await res.json();

            if (res.ok) {
                const token = data.token;
                localStorage.setItem('authToken', token);

                toast.success("Login Successful");

                router.push('/profile');
            } else {
                toast.error(data.error || "Login Failed");
            }
        } catch {
            toast.error("Can't Login at the Moment");
        }
    }

    return (
        <Main vortex >
            <FormContainer>
                <BackgroundGradient className="rounded-[22px] w-96 p-4 sm:p-10 bg-white dark:bg-zinc-900">
                    <form onSubmit={(e) => onSubmit(e)} className="w-full mx-auto">
                        <div className="mb-5">
                            <FormLabel htmlFor='aadhar' text='Your Aadhar Number' />
                            <FormInput setValue={setAadhar} type='number' id='aadhar' placeholder='XXXXXXXXXXXX' />
                        </div>
                        <div className="mb-5">
                            <FormLabel htmlFor='password' text='Your Password' />
                            <FormInput setValue={setPassword} type='password' id="password" />
                        </div>
                        <SubmitBtn />
                    </form>

                </BackgroundGradient>
            </FormContainer>
        </Main >
    )
}