"use client"
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Profile } from '@/types';
import Main from '@/components/Main';
import Heading from '@/components/Heading';
import { Card } from '@/components/blocks/cards-demo-3';
import Button from '@/components/Button';
import Navbar from '@/components/Navbar';
import { backend } from '@/lib/baseAPI';

export default function ProfilePage() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Fetch the token from localStorage after the component mounts (on the client)
        const authToken = localStorage.getItem('authToken');
        setToken(authToken);
    }, []);

    useEffect(() => {
        async function getProfile() {
            if (!token) return; // Only run the fetch if the token is available

            try {
                const response = await fetch(`${backend}/user/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    toast.error(errorData.error || 'Failed to fetch profile');
                    return;
                }

                const profileData = await response.json();
                setProfile(profileData.user);
                console.log('User profile data:', profileData);
            } catch {
                toast.error('Error fetching profile');
            }
        }

        getProfile();
    }, [token, router]); // Depend on the token

    return (
        <Main vortex={false}>
            <Navbar />
            <Heading text='My Profile' />
            {
                profile
                    ? (
                        <Card className=' mx-auto space-y-2'>
                            <h1 className='text-4xl w-max mx-auto underline mb-4'>{profile.name}</h1>
                            <h2>Email : {profile.email}</h2>
                            <h2>Mobile : {profile.mobile}</h2>
                            <h2>Age : {profile.age}</h2>
                            <h2>Aadhar Number : {profile.adharCardNumber}</h2>
                            <h2>Address : {profile.address}</h2>
                            <h2>Role : {profile.role}</h2>
                            <div className="flex w-full justify-between">
                                {profile.role == "admin" ?
                                    <Button text='Admin Panel' link='/admin' />
                                    :
                                    <Button text='Vote' link='/candidate/all' />
                                }
                                <Button text='Change Password' link='/changePassword' className=' mx-auto' />
                            </div>
                        </Card>
                    )
                    : "Nooo"
            }
        </Main>
    )
}
