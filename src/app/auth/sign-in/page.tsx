'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase/client';

export default function SignInPage() {
  const router = useRouter();
  const supabase = supabaseBrowser();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push('/dashboard');
  }

  return (
    <main className="mx-auto max-w-md p-8">
      <h1 className="text-2xl font-bold">Sign in</h1>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <input
          className="w-full rounded border p-2"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          required
        />
        <input
          className="w-full rounded border p-2"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          required
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          className="w-full rounded bg-black p-2 text-white disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      <p className="mt-4 text-sm">
        New here?{' '}
        <a className="underline" href="/auth/sign-up">
          Create an account
        </a>
      </p>
    </main>
  );
}
