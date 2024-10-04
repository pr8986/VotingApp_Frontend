"use client";

import Main from '@/components/Main';
import { CandidateInfo } from '@/types';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Card, CardDescription, CardTitle } from '@/components/blocks/cards-demo-3';
import Button from '@/components/Button';
import Navbar from '@/components/Navbar';

export default function AllCandidate() {
    const [candidates, setCandidates] = useState<CandidateInfo[] | null>(null);
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);
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
                    setIsAdmin(data.user.role === "admin");
                } else {
                    toast.error("No user found");
                    router.push('/login');
                }
            } catch {
                toast.error("Error fetching User");
                router.push('/login');
            }
        };

        getUserData();
        fetchCandidates();
    }, [router, token]);

    const vote = async (id: string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/candidate/vote/${id}`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': "application/json"
                }
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("Voted!");
                // Optionally, update the candidates state to reflect the vote
            } else {
                toast.error(data.messge || data.error || "Can't Vote at the moment");
            }
        } catch {
            toast.error("Can't Vote at the moment");
        }
    };

    if (!candidates) {
        return (
            <Main vortex={false}>
                <Navbar />
                <section className='w-full h-full'>
                    <h1 className='text-5xl w-max mx-auto mb-12'>All Candidates</h1>
                    <div>Loading candidates...</div>
                </section>
            </Main>
        );
    }

    return (
        <Main vortex={false}>
            <Navbar />
            <section className='w-full h-full'>
                <h1 className='text-5xl w-max mx-auto mb-12'>All Candidates</h1>
                {candidates.length > 0 ? (
                    candidates.map((item) => (
                        <Card className='mb-4' key={item._id}>
                            <CardTitle className='space-x-2 text-ellipsis'>
                                <span className='text-2xl'>{item.name}</span>
                                <span>--</span>
                                <span className='text-xl'>{item.party}</span>
                            </CardTitle>
                            <p>Votes : {item.votes.length}</p>
                            <CardDescription>
                                {isAdmin ? (
                                    <Button
                                        text='Update Candidate'
                                        link={`/candidate/update/${item._id}`}
                                    />
                                ) : (
                                    <button
                                        className=" bg-white text-black px-4 py-1.5 rounded-full mt-4"
                                        onClick={() => vote(item._id)}>
                                        Vote for this Candidate
                                    </button>
                                )}
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
