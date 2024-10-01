"use client"
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Profile } from '@/types';

export default function ProfilePage() {
    const token = localStorage.getItem('authToken');
    const router = useRouter();
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        async function getProfile() {
            try {
                const token = localStorage.getItem('authToken');

                if (!token) {
                    toast.error('No token found. Please log in first.');
                    router.push('/login');
                }

                const response = await fetch('http://localhost:3001/user/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    toast.error(errorData.error || 'Failed to fetch profile');
                }

                const profileData = await response.json();
                setProfile(profileData.user);
                console.log('User profile data:', profileData);
            } catch {
                toast.error('Error fetching profile:');
            }
        }

        getProfile();
    }, [token, router])

    return (
        <div>
            {token}
            {
                profile
                    ?
                    profile.name
                    :
                    "Nooo"
            }
        </div>
    )
}
