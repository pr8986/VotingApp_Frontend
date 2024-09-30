import Button from "@/components/Button";
import Main from "@/components/Main";
import { Vortex } from "@/components/ui/vortex";

export default function Home() {
  return (
    <Main>
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={120}
        className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
      >
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
          Voting App
        </h2>
        <div className=" space-x-4">
          <Button text="Login" link="/login" />
          <Button text="Sign Up" link="/signup" />
        </div>
      </Vortex>
    </Main >
  );
}