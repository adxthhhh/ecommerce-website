import { createClient } from './supabase/server';
import { prisma } from './prisma';
import { Role } from '@prisma/client';

/**
 * Gets the current user session and their profile from the database.
 * This is intended for use in Server Components.
 */
export async function getAuthUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const profile = await prisma.user.findUnique({
    where: { id: user.id },
  });

  return {
    ...user,
    profile,
  };
}

/**
 * Checks if the current user has a specific role.
 */
export async function hasRole(role: Role) {
  const user = await getAuthUser();
  return user?.profile?.role === role;
}

/**
 * Ensures the user has one of the allowed roles, or redirects.
 */
export async function checkRole(allowedRoles: Role[]) {
  const user = await getAuthUser();
  if (!user || !user.profile || !allowedRoles.includes(user.profile.role)) {
    return false;
  }
  return true;
}
