import Main from '@/components/Main'
import React from 'react'
import { BackgroundGradient } from '@/components/ui/background-gradient'
import FormLabel from '@/components/FormLabel'
import FormInput from '@/components/FormInput'
import FormContainer from '@/components/FormContainer'
import SubmitBtn from '@/components/SubmitBtn'


export default function page() {
    return (
        <Main vortex >
            <FormContainer>
                <BackgroundGradient className="rounded-[22px] w-96 p-4 sm:p-10 bg-white dark:bg-zinc-900">
                    <form className="w-full mx-auto">
                        <div className="mb-5">
                            <FormLabel htmlFor='aadhar' text='Your Aadhar Number' />
                            <FormInput type='number' id='aadhar' placeholder='XXXXXXXXXXXX' />
                        </div>
                        <div className="mb-5">
                            <FormLabel htmlFor='password' text='Your Password' />
                            <FormInput type='password' id="password" />
                        </div>
                        <SubmitBtn />
                    </form>

                </BackgroundGradient>
            </FormContainer>
        </Main >
    )
}

