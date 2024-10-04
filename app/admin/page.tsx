import Main from '@/components/Main'
import React from 'react'
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
    IconArrowWaveRightUp,
    // IconBoxAlignRightFilled,
    // IconBoxAlignTopLeft,
    IconClipboardCopy,
    IconFileBroken,
    IconSignature,
    IconTableColumn,
} from "@tabler/icons-react";
import Heading from '@/components/Heading';
import Image from 'next/image';

export default function page() {
    return (
        <Main vortex={false}>
            <Heading text='Admin Panel' />
            <BentoGrid className="max-w-4xl mx-auto mb-10">
                {items.map((item, i) => (
                    <BentoGridItem
                        title={item.title}
                        description={item.description}
                        key={i}
                        header={item.header}
                        icon={item.icon}
                        link={item.link}
                        className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                    />
                ))}
            </BentoGrid>
        </Main>
    )
}


// const Skeleton = () => (
//     <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
// );

const ImageContainer = ({ src, alt }: { src: string; alt: string }) => <Image src={src} alt={alt} className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100" height={100} width={100} />

const items = [
    {
        title: "Add a Candidate",
        description: "Add a new Candidate to a specific party",
        header: <ImageContainer src={'/addCandidate.png'} alt='Add a candidate' />,
        icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
        link: "/candidate/new"
    },
    {
        title: "Get all Candidates",
        description: "Get all info for every candidate",
        header: <ImageContainer src={'/ppl.jpeg'} alt='All candidate' />,
        icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
        link: "/candidate/all"
    },
    {
        title: "Delete a Candidate",
        description:
            "Candidate can be deleted by the Admin",
        header: <ImageContainer src={'/delete.png'} alt='Delete candidate' />,
        icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
        link: "/candidate/delete"
    },
    {
        title: "Party Votes",
        description: "View All the Votes for each Party",
        header: <ImageContainer src={'/vote.png'} alt='Vote' />,
        icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
        link: "/candidate/votes"
    },
    {
        title: "Your Profile",
        description: "Admin Profile",
        header: <ImageContainer src={'/profile.png'} alt='Profile' />,
        icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
        link: "/profile"
    },
    // {
    //     title: "The Joy of Creation",
    //     description: "Experience the thrill of bringing ideas to life.",
    //     header: <Skeleton />,
    //     icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
    //     link: ""
    // },
    // {
    //     title: "The Spirit of Adventure",
    //     description: "Embark on exciting journeys and thrilling discoveries.",
    //     header: <Skeleton />,
    //     icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    //     link: ""
    // },
];