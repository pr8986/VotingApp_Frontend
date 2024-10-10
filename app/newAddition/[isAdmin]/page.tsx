"use client"
import React, { useState } from 'react'
import Main from '@/components/Main'
import { BackgroundGradient } from '@/components/ui/background-gradient'
import FormInput from '@/components/FormInput'
import FormLabel from '@/components/FormLabel'
import SubmitBtn from '@/components/SubmitBtn'
import FormContainer from '@/components/FormContainer'
import toast from 'react-hot-toast'
import { backend } from '@/lib/baseAPI'


type Params = {
    params: {
        isAdmin: string
    }
}

export default function Page({ params: { isAdmin } }: Params) {

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [aadhar, setAadhar] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');

    const onSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch(`${backend}/user/signup`, {
                method: "POST",
                headers: {
                    'Content-type': "application/json"
                },
                body: JSON.stringify({
                    name,
                    age,
                    email,
                    mobile,
                    address,
                    password,
                    adharCardNumber: aadhar,
                    ...(
                        isAdmin === "admin" && {
                            role: "admin"
                        }
                    )
                })
            })
            const data = await res.json();
            if (res.ok) {
                toast.success("User added")
            } else {
                toast.error(data.error);
            }
        } catch {
            toast.error("Unable to add new user at the momnent")
        }

    }

    return (
        <Main vortex >
            <FormContainer text={isAdmin === "admin" ? "Add Admin" : "Add new User"} >
                <BackgroundGradient className="rounded-[22px] w-[500px] p-4 sm:p-10 bg-white dark:bg-zinc-900">
                    <form onSubmit={onSumbit} className="w-full mx-auto">
                        <div className="mb-5 flex gap-2 w-full">
                            <div className='w-full'>
                                <FormLabel htmlFor='name' text='Your Name' />
                                <FormInput setValue={setName} type='text' id='name' />
                            </div>
                            <div className='w-full'>
                                <FormLabel htmlFor='age' text='Age' />
                                <FormInput setValue={setAge} type='number' id='age' />
                            </div>
                        </div>
                        <div className="mb-5 flex gap-2 w-full">
                            <div className='w-full'>
                                <FormLabel htmlFor='mobile' text='Your Mobile Number' />
                                <FormInput setValue={setMobile} type='number' id='mobile' />
                            </div>
                            <div className='w-full'>
                                <FormLabel htmlFor='email' text='Your email' />
                                <FormInput setValue={setEmail} type='email' id='email' placeholder='example@email.com' />
                            </div>
                        </div>
                        <div className="mb-5">
                            <FormLabel htmlFor='address' text='Your Address' />
                            <FormInput setValue={setAddress} type='text' id='address' />
                        </div>
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
        </Main>
    )
}
