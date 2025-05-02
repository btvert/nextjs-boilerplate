import Image from "next/image";

export default function PixelotsPage() {
  return (
    <div className="h-screen grid place-items-center text-center px-6">
      <main className="flex flex-col gap-8 items-center">
        <Image
          src="/pixelots400.svg"
          alt="Pixelots logo"
          width={80}
          height={80}
          className="rounded-md dark:invert"
        />
        <h1 className="text-3xl font-bold">Welcome to Pixelots</h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-xs">
          A visual-first platform. Your board. Your content. One pixel at a time.
        </p>
      </main>
    </div>
  );
}
