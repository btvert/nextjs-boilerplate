export default function RegisterPage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold text-center sm:text-left">Create Your Board</h1>
        <p className="text-sm text-center sm:text-left text-neutral-600 dark:text-neutral-400">
          Join the network and claim your custom page.
        </p>
        <form className="flex flex-col gap-4 w-full sm:w-[300px]">
          <input
            type="text"
            placeholder="Username"
            className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white"
            disabled
          />
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white"
            disabled
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white"
            disabled
          />
          <button
            className="bg-black dark:bg-white text-white dark:text-black font-semibold px-4 py-2 rounded cursor-not-allowed"
            disabled
          >
            Register (Coming Soon)
          </button>
        </form>
      </main>
    </div>
  );
}
