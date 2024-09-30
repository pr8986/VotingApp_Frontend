import React, { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    type: string;
    placeholder?: string;
    setValue: React.Dispatch<React.SetStateAction<string>>
}

export default function FormInput({ id, type, placeholder, setValue, ...props }: Props) {
    return (
        <input {...props} onChange={(e) => setValue(e.target.value)} type={type} id={id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
    )
}
