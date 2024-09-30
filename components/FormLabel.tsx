import React from 'react'

interface Props {
    htmlFor: string;
    text: string;
}

export default function FormLabel({ htmlFor, text }: Props) {
    return (
        <label htmlFor={htmlFor} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {text}
        </label>
    )
}
