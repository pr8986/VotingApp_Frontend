"use client"
import Main from '@/components/Main'
import { CandidateInfo } from '@/types';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Card, CardDescription, CardTitle } from '@/components/blocks/cards-demo-3';
import Button from '@/components/Button';

export default function AllCandidate() {
    const [candidate, setCandidate] = useState<CandidateInfo[] | null>(null);
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/candidate/allcandidate`);
                const data = await res.json();
                if (res.ok) {
                    setCandidate(data);
                } else {
                    toast.error(data.message);
                    router.push('/profile')
                }
            } catch {
                toast.error("Error fetching candidates at the moment");
                router.push('/profile')
            }
        }

        const getUserData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const data = await res.json();
                if (res.ok) {
                    setIsAdmin(data.user.role === "admin")
                } else {
                    toast.error("No user find");
                    router.push('/login');
                }
            } catch {
                toast.error("Error fetching User");
                router.push('/login');

            }
        }
        getUserData();
        fetchCandidates();
    }, [])

    return (
        <Main vortex={false}>
            <section className='w-full h-full'>
                <h1 className='text-5xl w-max mx-auto mb-12'>All Candidates</h1>
                {
                    candidate
                        ?
                        candidate.length > 0
                            ?

                            candidate.map((item, i) => (
                                <Card className='mb-4' key={i}>
                                    <CardTitle className='space-x-2 text-ellipsis'>
                                        <span className='text-2xl'>
                                            {item.name}
                                        </span>
                                        <span className=' text-xl'>
                                            {item.party}
                                        </span>
                                    </CardTitle>
                                    <CardDescription>
                                        {
                                            isAdmin
                                                ?
                                                <Button text='Update Candidate' link={`/candidate/update/${item._id}`} />
                                                :
                                                <Button text='Vote for this Candidate' />
                                        }
                                    </CardDescription>
                                </Card>
                            ))
                            :
                            <div>
                                No Candidates Available
                            </div>

                        :
                        <div>
                            No Candidates Available
                        </div>
                }
            </section>
        </Main>
    )
}
