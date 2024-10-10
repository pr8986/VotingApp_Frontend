import React, { ReactNode } from 'react'
import classNames from 'classnames';
import { Vortex } from "@/components/ui/vortex";

interface Props {
    children: ReactNode;
    className?: string;
    vortex: boolean;
}

export default function Main({ children, className, vortex }: Props) {
    const mainClassName = classNames(className, "w-screen h-screen overflow-x-hidden overflow-y-auto bg-black text-white dark");
    return (

        vortex
            ?
            <main className={mainClassName}>
                < Vortex
                    backgroundColor="black"
                    rangeY={800}
                    particleCount={600}
                    baseHue={120}
                    className="w-full h-full"
                >

                    {children}
                </ Vortex>
            </main >
            :
            <main className={mainClassName}>
                {children}
            </main>


    )
}