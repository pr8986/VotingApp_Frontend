import Link from 'next/link';
import React from 'react'

interface Props {
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

function BTN({ text }: { text: string }) {
    return (

        <button className=" bg-white text-black px-4 py-1.5 rounded-full mt-4">
            {text}
        </button>

    )
}