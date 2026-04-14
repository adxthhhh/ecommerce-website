'use client';

import { login } from '@/app/auth/actions';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await login(formData);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80dvh] flex items-center justify-center p-6">
      <div 
        className="w-full max-w-md bg-white border border-[#e5e5e5] p-8 squircle shadow-sm"
        style={{ borderRadius: 'var(--radius-lg)' }}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight mb-2">Welcome back</h1>
          <p className="text-sm text-[#6b6b6b]">Enter your details to access your account.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-[#9a9a9a]">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full block px-4 py-3 bg-[#f9f9f9] border border-[#e5e5e5] focus:border-black transition-base outline-none"
              style={{ borderRadius: 'var(--radius-sm)' }}
              placeholder="jane@example.com"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-[#9a9a9a]">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full block px-4 py-3 bg-[#f9f9f9] border border-[#e5e5e5] focus:border-black transition-base outline-none"
              style={{ borderRadius: 'var(--radius-sm)' }}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-3 bg-black/5 text-black text-sm squircle-sm border border-black/10">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-black text-white font-bold hover:bg-[#333] transition-base disabled:opacity-50"
            style={{ borderRadius: 'var(--radius-sm)' }}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#e5e5e5] text-center">
          <p className="text-sm text-[#6b6b6b]">
            Don't have an account?{' '}
            <Link href="/signup" className="text-black font-bold hover:underline transition-base">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
