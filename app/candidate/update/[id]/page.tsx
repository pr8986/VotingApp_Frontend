"use client"
import FormContainer from '@/components/FormContainer'
import { BackgroundGradient } from '@/components/ui/background-gradient'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Main from '@/components/Main'
import FormLabel from '@/components/FormLabel'
import FormInput from '@/components/FormInput'
import SubmitBtn from '@/components/SubmitBtn'

type Params = {
    params: {
        id: string
    }
}


export default function Update({ params: { id } }: Params) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [party, setParty] = useState('');

    useEffect(() => {
        const getCandidateData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/candidate/getCandidate/${id}`)
                const data = await res.json();
                if (res.ok) {
                    setName(data.name);
                    setAge(data.age);
                    setParty(data.party);
                } else {
                    toast.error(data.message || "Can't fetch at the moment");
                }
            } catch {
                toast.error("Can't fetch at the moment");
            }

        }
        getCandidateData();
    }, [])

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('authToken');
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/candidate/${id}`, {
                method: "PUT",
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
                toast.success("Updation Successful");
            } else {
                toast.error(data.message || data.error || "Candidate Updation failed");
            }
        } catch {
            toast.error("Can't Update at the Moment");
        }
    }

    return (
        <Main vortex={false}>
            <FormContainer text="Upadte Candidate">
                <BackgroundGradient className="rounded-[22px] w-96 p-4 sm:p-10 bg-white dark:bg-zinc-900">
                    <form onSubmit={(e) => onSubmit(e)} className="w-full mx-auto">
                        <div className="mb-5">
                            <FormLabel htmlFor='name' text='Candidate Name' />
                            <FormInput value={name} setValue={setName} type='text' id='name' />
                        </div>
                        <div className="mb-5">
                            <FormLabel htmlFor='age' text='Candidate Age' />
                            <FormInput value={age} setValue={setAge} type='number' id="age" />
                        </div>
                        <div className="mb-5">
                            <FormLabel htmlFor='party' text='Candidate Party' />
                            <FormInput value={party} setValue={setParty} type='text' id="party" />
                        </div>
                        <SubmitBtn />
                    </form>
                </BackgroundGradient>
            </FormContainer>
        </Main>
    )
}
