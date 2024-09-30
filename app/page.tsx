import Button from "@/components/Button";
import Main from "@/components/Main";
import Link from "next/link";

export default function Home() {
  return (
    <Main vortex={true}>
      <div className="flex flex-col w-max mx-auto h-full items-center justify-center relative">
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
          Voting App
        </h2>
        <div className=" space-x-4">
          <Button text="Get Started" link="/login" />
        </div>
        <Link href={'/admin'} className=" absolute bottom-0">
          Go to Admin Panel ?
        </Link>
      </div>


    </Main >
  );
}