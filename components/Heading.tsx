import React from 'react'

interface Props {
    text: string;
}

export default function Heading({ text }: Props) {
    return (
        <h1 className='text-5xl w-max mx-auto mb-12'>{text}</h1>
    )
}