import Link from 'next/link';
import React, { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    link?: string;
}

export default function Button({ text, link }: Props) {
    return (
        link
            ?
            <Link href={link}>
                <BTN text={text} />
            </Link>
            :
            <BTN text={text} />

    )
}

interface miniProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string
}

function BTN({ text }: miniProps) {
    return (

        <button className=" bg-white text-black px-4 py-1.5  rounded-full mt-4">
            {text}
        </button>

    )
}