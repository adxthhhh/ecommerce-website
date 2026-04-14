'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error('Login error:', error.message);
      return { error: error.message };
    }

    revalidatePath('/', 'layout');
  } catch (err: any) {
    if (err.message === 'NEXT_REDIRECT') throw err;
    console.error('Unexpected login error:', err);
    return { error: err.message || 'An unexpected error occurred' };
  }

  redirect('/');
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;
  
  try {
    const supabase = await createClient();

    // Create user
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
          role: 'CUSTOMER', // Default role
        },
      },
    });

    if (error) {
      console.error('Signup error:', error.message);
      return { error: error.message };
    }

    revalidatePath('/', 'layout');
  } catch (err: any) {
    if (err.message === 'NEXT_REDIRECT') throw err; // Re-throw next.js redirect internal error
    console.error('Unexpected signup error:', err);
    return { error: err.message || 'An unexpected error occurred' };
  }
  
  // Redirect must be called outside the try/catch or explicitly handled
  redirect('/');
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/login');
}
