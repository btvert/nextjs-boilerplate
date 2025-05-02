import { type Metadata } from "next";
import UserGrid from "@/components/UserGrid";

type Props = {
  params: {
    username: string;
  };
};

export const metadata: Metadata = {
  title: "User Board",
  description: "User-generated content board.",
};

export default function UserPage({ params }: Props) {
  const { username } = params;

  return (
    <div className="h-screen grid place-items-center text-center px-6">
      <main className="flex flex-col gap-6 items-center">
        <h1 className="text-2xl font-bold">{username}'s Board</h1>
        <UserGrid />
      </main>
    </div>
  );
}
