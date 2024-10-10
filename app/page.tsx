import Button from "@/components/Button";
import Main from "@/components/Main";
import Link from "next/link";

export default function Home() {
  return (
    <Main vortex={true}>
      <div className="flex flex-col w-max mx-auto h-full items-center justify-center relative">
        <h2 className="text-white text-3xl md:text-6xl font-bold text-center">
          Voting App
        </h2>
        <div className=" space-x-4">
          <Button text="Login" link="/login" />
          <Button text="Sign up" link="/newAddition/user" />
        </div>
        <Link href={'/newAddition/admin'} className=" absolute bottom-0">
          Add an Admin ?
        </Link>
      </div>


    </Main >
  );
}