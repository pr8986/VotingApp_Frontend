import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode;
    text: string;
}

export default function FormContainer({ children, text }: Props) {
    return (
        <section className='flex w-full justify-center items-center flex-col '>
            <h1 className='my-4 text-2xl'>{text}</h1>
            {children}
        </section>
    )
}
