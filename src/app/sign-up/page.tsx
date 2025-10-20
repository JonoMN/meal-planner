'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase/client';

export default function SignUpPage() {
  const router = useRouter();
  const supabase = supabaseBrowser();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const { data, error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    // If email confirmations are ON, user must confirm before they can sign in
    if (data.user && !data.user.confirmed_at) {
      setMessage('Check your email to confirm your account.');
    } else {
      // If confirmations are OFF (dev), you can go straight to the app
      router.push('/dashboard');
    }
  }

  return (
    <main className="mx-auto max-w-md p-8">
      <h1 className="text-2xl font-bold">Create an account</h1>
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
        {message && <p className="text-sm text-green-700">{message}</p>}
        <button
          className="w-full rounded bg-black p-2 text-white disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Creating account…' : 'Sign up'}
        </button>
      </form>
      <p className="mt-4 text-sm">
        Already have an account?{' '}
        <a className="underline" href="/sign-in">
          Sign in
        </a>
      </p>
    </main>
  );
}
