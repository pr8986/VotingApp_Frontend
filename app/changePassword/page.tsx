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

export default function Changepassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/user/profile/password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Password updated successfully');
                // Navigate to another page, e.g., user profile
                router.push('/profile');
            } else {
                toast.error(data.error || 'Failed to update password');
            }
        } catch (err) {
            toast.error('Something went wrong. Please try again later.');
            console.error(err);
        }
    };

    return (
        <Main vortex >
            <FormContainer>
                <BackgroundGradient className="rounded-[22px] w-96 p-4 sm:p-10 bg-white dark:bg-zinc-900">
                    <form onSubmit={(e) => handleSubmit(e)} className="w-full mx-auto">
                        <div className="mb-5">
                            <FormLabel htmlFor='curr' text='Current Password' />
                            <FormInput setValue={setCurrentPassword} type='text' id='curr' />
                        </div>
                        <div className="mb-5">
                            <FormLabel htmlFor='newpassword' text='New Password' />
                            <FormInput setValue={setNewPassword} type='password' id="newpassword" />
                        </div>
                        <SubmitBtn />
                    </form>

                </BackgroundGradient>
            </FormContainer>
        </Main >
    )
}
