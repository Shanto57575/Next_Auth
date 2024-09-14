import Image from "next/image";

export default function Home() {
  return (
      <main className="flex flex-col items-center justify-center h-screen">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
      />
      <h1 className="mt-5 font-serif text-5xl">Auth</h1>
      </main>
  );
}
