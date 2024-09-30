import React, { ReactNode } from 'react'
import classNames from 'classnames';

interface Props {
    children: ReactNode;
    className?: string;
}

export default function Main({ children, className }: Props) {
    const mainClassName = classNames(className, "w-screen h-screen overflow-x-hidden overflow-y-auto bg-black text-white");
    return (
        <main className={mainClassName}>
            {children}
        </main>
    )
}