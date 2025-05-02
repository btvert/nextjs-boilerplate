import UserGrid from "@/components/UserGrid";

export default function UserPage({ params }: { params: { username: string } }) {
  const username = params.username;

  return (
    <div className="h-screen grid place-items-center text-center px-6">
      <main className="flex flex-col gap-6 items-center">
        <h1 className="text-2xl font-bold">{username}'s Board</h1>
        <UserGrid />
      </main>
    </div>
  );
}
