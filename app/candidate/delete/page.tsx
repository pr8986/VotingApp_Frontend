"use client"


import React, { useState, useEffect } from 'react'
import Main from '@/components/Main'
import { CandidateInfo } from '@/types';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Card, CardTitle, CardDescription } from '@/components/blocks/cards-demo-3';
export default function Delete() {
    const [candidates, setCandidates] = useState<CandidateInfo[] | null>(null);
    const router = useRouter();
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

    useEffect(() => {
        if (!token) {
            toast.error("No authentication token found");
            router.push('/login');
            return;
        }

        const fetchCandidates = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/candidate/allcandidate`);
                const data = await res.json();
                if (res.ok) {
                    setCandidates(data);
                } else {
                    toast.error(data.message);
                    router.push('/profile');
                }
            } catch {
                toast.error("Error fetching candidates at the moment");
                router.push('/profile');
            }
        };
        fetchCandidates();
    }, [router, token]);

    const deleteCandidate = async (id: string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/candidate/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': "application/json"
                }
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("Deleted Succesfully");
                // Optionally, update the candidates state to reflect the vote
            } else {
                toast.error(data.message || data.error || "Can't Delete at the moment");
            }
        } catch {
            toast.error("Can't Delete at the moment");
        }
    };

    if (!candidates) {
        return (
            <Main vortex={false}>
                <section className='w-full h-full'>
                    <h1 className='text-5xl w-max mx-auto mb-12'>All Candidates</h1>
                    <div>Loading candidates...</div>
                </section>
            </Main>
        );
    }

    return (
        <Main vortex={false}>
            <section className='w-full h-full'>
                <h1 className='text-5xl w-max mx-auto mb-12'>All Candidates</h1>
                {candidates.length > 0 ? (
                    candidates.map((item) => (
                        <Card className='mb-4' key={item._id}>
                            <CardTitle className='space-x-2 text-ellipsis'>
                                <span className='text-2xl'>{item.name}</span>
                                <span className='text-xl'>{item.party}</span>
                            </CardTitle>
                            <p>Votes : {item.votes.length}</p>
                            <CardDescription>
                                <button
                                    className=" bg-red-500 text-white px-4 py-1.5 rounded-full mt-4"
                                    onClick={() => deleteCandidate(item._id)}>
                                    Delete this Candidate
                                </button>
                            </CardDescription>
                        </Card>
                    ))
                ) : (
                    <div>No Candidates Available</div>
                )}
            </section>
        </Main>
    );
}
