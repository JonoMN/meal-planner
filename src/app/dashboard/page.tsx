import { redirect } from 'next/navigation';
import { getServerUser } from '@/lib/auth/session';

export default async function DashboardPage() {
  const user = await getServerUser();
  if (!user) {
    redirect('/auth/sign-in');
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2">Hello, {user.email}.</p>
      <form action="/auth/sign-out" method="post" className="mt-6">
        <button className="rounded bg-gray-900 px-4 py-2 text-white">Sign out</button>
      </form>
    </main>
  );
}
