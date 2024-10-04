"use client"
import Main from '@/components/Main'
import React, { useState } from 'react'
import FormContainer from '@/components/FormContainer'
import { BackgroundGradient } from '@/components/ui/background-gradient'
import FormInput from '@/components/FormInput'
import FormLabel from '@/components/FormLabel'
import toast from 'react-hot-toast'
import SubmitBtn from '@/components/SubmitBtn'


export default function NewCandidate() {

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [party, setParty] = useState('');

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('authToken');
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/candidate`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-type': "application/json"
                },
                body: JSON.stringify({
                    name, party, age
                })
            })
            const data = await res.json();

            if (res.ok) {
                toast.success("Registration Successful");
            } else {
                toast.error(data.message || data.error || "Candidate registration failed");
            }
        } catch {
            toast.error("Can't Register at the Moment");
        }
    }


    return (
        <Main vortex={false}>
            <FormContainer>
                <BackgroundGradient className="rounded-[22px] w-96 p-4 sm:p-10 bg-white dark:bg-zinc-900">
                    <form onSubmit={(e) => onSubmit(e)} className="w-full mx-auto">
                        <div className="mb-5">
                            <FormLabel htmlFor='name' text='Candidate Name' />
                            <FormInput setValue={setName} type='text' id='name' />
                        </div>
                        <div className="mb-5">
                            <FormLabel htmlFor='age' text='Candidate Age' />
                            <FormInput setValue={setAge} type='number' id="age" />
                        </div>
                        <div className="mb-5">
                            <FormLabel htmlFor='party' text='Candidate Party' />
                            <FormInput setValue={setParty} type='text' id="party" />
                        </div>
                        <SubmitBtn />
                    </form>
                </BackgroundGradient>
            </FormContainer>
        </Main>
    )
}
