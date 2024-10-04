"use client"
import { Card, CardDescription, CardTitle } from '@/components/blocks/cards-demo-3';
import Heading from '@/components/Heading';
import Main from '@/components/Main';
import { PartyVote } from '@/types';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function VoteCount() {
    const [vote, setVote] = useState<PartyVote[] | null>(null)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/candidate/vote/count`);
                const data = await res.json();
                if (res.ok) {
                    setVote(data);
                } else {
                    toast.error(data)
                }
            } catch {
                toast.error("Can't Vote at the moment");
            }
        }
        fetchUser();
    })
    return (
        <Main vortex={false}>
            <section className='w-full h-full'>
                <Heading text='Votes of Parties' />
                <div className='grid w-max gap-2 grid-cols-2 mx-auto'>
                    {
                        vote
                            ?
                            vote.map((item, i) => (
                                <Card key={i}>
                                    <CardTitle>
                                        {item.party}
                                    </CardTitle>
                                    <CardDescription>
                                        Total Votes : {item.count}
                                    </CardDescription>
                                </Card>
                            ))
                            :
                            <div>
                                No data Available
                            </div>
                    }
                </div>
            </section>
        </Main>
    )
}
