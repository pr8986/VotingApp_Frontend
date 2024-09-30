import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

export default function FormContainer({ children }: Props) {
    return (
        <section className='flex w-full justify-center items-center h-full'>
            {children}
        </section>
    )
}
